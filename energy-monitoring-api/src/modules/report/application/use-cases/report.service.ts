import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  ReportDto,
  OrganizationReportDto,
  MeterReportDto,
  MeterSummaryDto,
  MeterReadingSummaryDto,
} from '../dtos/report.dto';
import { CurrentUserDto } from 'src/modules/auth/application/dtos/current-user.dto';
import { GetReportDto } from '../dtos/get-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getReport(
    user: CurrentUserDto,
    meterIds?: string[],
  ): Promise<ReportDto> {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Admin ise tüm org'lar, user ise sadece kendi org'u
    const meterWhere =
      user.role === 'admin'
        ? meterIds && meterIds.length > 0
          ? { id: { in: meterIds } }
          : {}
        : {
            organizationId: user.orgId || undefined,
            ...(meterIds && meterIds.length > 0
              ? { id: { in: meterIds } }
              : {}),
          };

    const organizations = await this.prisma.organization.findMany({
      where: {
        isDeleted: false,
        ...(user.role === 'admin' ? {} : user.orgId ? { id: user.orgId } : {}),
      },
      include: {
        meters: {
          where: {
            ...meterWhere,
            isDeleted: false,
            ...(user.role !== 'admin' && user.orgId
              ? { organizationId: user.orgId }
              : {}),
          },
          include: {
            readings: {
              where: { timestamp: { gte: since }, isDeleted: false },
            },
          },
        },
      },
    });

    const orgReports: OrganizationReportDto[] = organizations.map((org) => {
      let orgTotal = 0;
      const meters: MeterReportDto[] = org.meters.map((meter) => {
        const total = meter.readings.reduce(
          (sum, r) => sum + r.consumptionKwh,
          0,
        );
        orgTotal += total;
        return {
          meterId: meter.id,
          meterName: meter.name,
          organizationId: org.id,
          organizationName: org.name,
          totalConsumption: total,
          readings: meter.readings.map((r) => ({
            id: r.id,
            meterId: r.meterId,
            timestamp: r.timestamp,
            indexKwh: r.indexKwh,
            consumptionKwh: r.consumptionKwh,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
          })),
        };
      });
      return {
        organizationId: org.id,
        organizationName: org.name,
        totalConsumption: orgTotal,
        meters,
      };
    });

    return { reports: orgReports };
  }

  async getDetailedReport(
    user: CurrentUserDto,
    query: GetReportDto,
  ): Promise<MeterSummaryDto[]> {
    const now = new Date();
    const start = query.startTime
      ? new Date(query.startTime)
      : new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const end = query.endTime ? new Date(query.endTime) : now;

    let meters: Array<{
      id: string;
      name: string;
      readings: Array<{
        timestamp: Date;
        indexKwh: number;
        consumptionKwh: number;
      }>;
    }> = [];
    if (user.role === 'admin') {
      // Admin: filter by org and meterIds if provided
      const where: Record<string, any> = { isDeleted: false };
      if (query.organizationId) where.organizationId = query.organizationId;
      const meterIds = Array.isArray(query.meterIds)
        ? query.meterIds
        : query.meterIds
          ? [query.meterIds]
          : undefined;
      if (meterIds && meterIds.length > 0) where.id = { in: meterIds };
      meters = await this.prisma.meter.findMany({
        where,
        include: {
          readings: {
            where: {
              timestamp: { gte: start, lte: end },
              isDeleted: false,
            },
            orderBy: { timestamp: 'asc' },
          },
        },
      });
    } else {
      // User: own org meters + assigned meters
      if (!user.orgId) return [];
      // 1. Org meters
      const orgMeters = await this.prisma.meter.findMany({
        where: {
          organizationId: user.orgId,
          isDeleted: false,
          ...(query.meterIds && query.meterIds.length > 0
            ? {
                id: {
                  in: Array.isArray(query.meterIds)
                    ? query.meterIds
                    : [query.meterIds],
                },
              }
            : {}),
        },
        include: {
          readings: {
            where: {
              timestamp: { gte: start, lte: end },
              isDeleted: false,
            },
            orderBy: { timestamp: 'asc' },
          },
        },
      });
      // 2. Assigned meters
      const userMeterRows: { meterId: string }[] =
        await this.prisma.userMeter.findMany({
          where: { userId: user.userId },
          select: { meterId: true },
        });
      const assignedMeterIds = userMeterRows.map((um) => um.meterId);
      const assignedMeters =
        assignedMeterIds.length > 0
          ? await this.prisma.meter.findMany({
              where: {
                id: { in: assignedMeterIds },
                isDeleted: false,
                ...(query.meterIds && query.meterIds.length > 0
                  ? {
                      id: {
                        in: Array.isArray(query.meterIds)
                          ? query.meterIds
                          : [query.meterIds],
                      },
                    }
                  : {}),
              },
              include: {
                readings: {
                  where: {
                    timestamp: { gte: start, lte: end },
                    isDeleted: false,
                  },
                  orderBy: { timestamp: 'asc' },
                },
              },
            })
          : [];
      // Merge and deduplicate
      const meterMap = new Map<
        string,
        {
          id: string;
          name: string;
          readings: Array<{
            timestamp: Date;
            indexKwh: number;
            consumptionKwh: number;
          }>;
        }
      >();
      for (const m of [...orgMeters, ...assignedMeters]) {
        if (!meterMap.has(m.id)) meterMap.set(m.id, m);
      }
      meters = Array.from(meterMap.values());
    }

    // Map to MeterSummaryDto
    return meters.map((meter) => {
      const readings: MeterReadingSummaryDto[] = meter.readings.map((r) => ({
        timestamp: r.timestamp.toISOString(),
        index_kwh: r.indexKwh,
        consumption_kwh: r.consumptionKwh,
      }));
      const totalConsumptionKwh = meter.readings.reduce(
        (sum, r) => sum + r.consumptionKwh,
        0,
      );
      return {
        meterId: meter.id,
        meterName: meter.name,
        totalConsumptionKwh,
        readings,
      };
    });
  }
}
