import { Injectable } from '@nestjs/common';
import { UserMeterRepository } from '../../domain/interfaces/user-meter.repository';
import { UserMeter } from '../../domain/entities/user-meter.entity';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class PrismaUserMeterRepository implements UserMeterRepository {
  constructor(protected prisma: PrismaService) {
    this.prisma = prisma;
  }
  /**
   * Deletes a user meter association by userId and meterId.
   * @param userId - The ID of the user.
   * @param meterId - The ID of the meter.
   * @returns A promise that resolves when the deletion is complete.
   */
  delete(userId: string, meterId: string): Promise<void> {
    return this.prisma.userMeter
      .delete({
        where: {
          userId_meterId: {
            userId: userId,
            meterId: meterId,
          },
        },
      })
      .then(() => {});
  }
  /**
   * Creates a new user meter association.
   * @param data - The UserMeter data to create.
   * @returns A promise that resolves to the created UserMeter entity.
   */
  async create(data: UserMeter): Promise<UserMeter> {
    const a = await this.prisma.userMeter.create({
      data: {
        createdAt: data.createdAt,
        isDeleted: data.isDeleted,
        userId: data.userId,
        meterId: data.meterId,
      },
    });
    return a as UserMeter;
  }
}
