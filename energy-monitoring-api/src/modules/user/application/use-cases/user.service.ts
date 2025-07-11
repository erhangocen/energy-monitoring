import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const raw = await this.userRepo.findByEmail(email); // raw, Prisma’dan include'lu geldi
    if (!raw) return null;

    return new UserDto({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
      organizationId: raw.organizationId,
      organizationName: raw.organization?.name ?? null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepo.findAll();
    return users.map(
      (user) =>
        new UserDto({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId,
          organizationName: user.organization?.name ?? null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      organizationName: user.organization?.name ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
