import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { GenericRepository } from 'src/shared/infrastructure/prisma-base.repository';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/interfaces/user.repository';

@Injectable()
export class PrismaUserRepository
  extends GenericRepository<User>
  implements UserRepository
{
  constructor(protected prisma: PrismaService) {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
      include: {
        organization: true,
      },
    });
    if (!result) return null;
    return result;
  }
}
