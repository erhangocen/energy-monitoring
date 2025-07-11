import { BaseRepository } from 'src/shared/domain/base.repository';
import { User } from '../entities/user.entity';

export abstract class UserRepository extends BaseRepository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
}
