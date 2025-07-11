import { Injectable } from '@nestjs/common';
import { UserMeterRepository } from '../../domain/interfaces/user-meter.repository';
import { UserMeter } from '../../domain/entities/user-meter.entity';
import { CreateUserMeterDto } from '../dtos/create-user-meter.dto';
import { DeleteUserMeterDto } from '../dtos/delete-user-meter.dto';
import { UserMeterDto } from '../dtos/user-meter.dto';

@Injectable()
export class UserMeterService {
  constructor(private readonly userMeterRepo: UserMeterRepository) {}

  async create(req: CreateUserMeterDto): Promise<UserMeterDto> {
    const userMeter: UserMeter = new UserMeter(req.userId, req.meterId);
    const result = await this.userMeterRepo.create(userMeter);
    return { meterId: result.meterId, userId: result.userId } as UserMeterDto;
  }

  async delete(req: DeleteUserMeterDto): Promise<boolean> {
    await this.userMeterRepo.delete(req.userId, req.meterId);
    return true;
  }
}
