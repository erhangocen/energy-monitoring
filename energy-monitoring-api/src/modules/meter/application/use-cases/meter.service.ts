import { Injectable, NotFoundException } from '@nestjs/common';
import { MeterRepository } from '../../domain/interfaces/meter.repository';
import { CreateMeterDto } from '../dtos/create-meter.dto';
import { MeterDto, MeterListFilterDto } from '../dtos/meter.dto';
import { Meter } from '../../domain/entities/meter.entity';
import { CurrentUserDto } from 'src/modules/auth/application/dtos/current-user.dto';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class MeterService {
  constructor(
    private readonly repo: MeterRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateMeterDto): Promise<MeterDto> {
    const meter = new Meter(data.name, data.organizationId);

    const created = await this.repo.create(meter);
    return new MeterDto({
      id: created.id,
      name: created.name,
      organizationId: created.organizationId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findAll(): Promise<MeterDto[]> {
    const meters = await this.repo.findAll();
    return meters.map(
      (m) =>
        new MeterDto({
          id: m.id,
          name: m.name,
          organizationId: m.organizationId,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<MeterDto> {
    const meter = await this.repo.findById(id);
    if (!meter) {
      throw new NotFoundException('Meter not found');
    }
    return new MeterDto({
      id: meter.id,
      name: meter.name,
      organizationId: meter.organizationId,
      createdAt: meter.createdAt,
      updatedAt: meter.updatedAt,
    });
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }

  async filteredList(
    user: CurrentUserDto,
    filter: MeterListFilterDto,
  ): Promise<MeterDto[]> {
    if (user.role === 'admin') {
      const where: Record<string, any> = { isDeleted: false };
      if (filter.organizationId) where.organizationId = filter.organizationId;
      if (filter.search)
        where.name = { contains: filter.search, mode: 'insensitive' };
      const meters = await this.prisma.meter.findMany({ where });
      return meters.map((m: Meter) => new MeterDto(m));
    }
    if (!user.orgId) return [];
    const orgMeters = await this.prisma.meter.findMany({
      where: {
        organizationId: user.orgId,
        isDeleted: false,
        ...(filter.search
          ? { name: { contains: filter.search, mode: 'insensitive' } }
          : {}),
      },
    });
    // Get assigned meterIds from user-meter
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
              ...(filter.search
                ? { name: { contains: filter.search, mode: 'insensitive' } }
                : {}),
            },
          })
        : [];
    // Merge and deduplicate
    const allMeters: Meter[] = [...orgMeters, ...assignedMeters].reduce(
      (acc: Meter[], m: Meter) => {
        if (!acc.find((x) => x.id === m.id)) acc.push(m);
        return acc;
      },
      [],
    );
    return allMeters.map((m) => new MeterDto(m));
  }
}
