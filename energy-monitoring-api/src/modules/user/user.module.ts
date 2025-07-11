import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UserRepository } from './domain/interfaces/user.repository';
import { PrismaUserRepository } from './infrastructure/repository/prisma-user.repository';
import { UserService } from './application/use-cases/user.service';
import { UserController } from './api/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
