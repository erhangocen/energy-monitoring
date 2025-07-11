import { UserMeter } from '../entities/user-meter.entity';

export abstract class UserMeterRepository {
  abstract create(data: UserMeter): Promise<UserMeter>;
  abstract delete(userId: string, meterId: string): Promise<void>;
}
