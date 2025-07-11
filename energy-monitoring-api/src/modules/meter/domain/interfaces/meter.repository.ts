import { BaseRepository } from 'src/shared/domain/base.repository';
import { Meter } from '../entities/meter.entity';

export abstract class MeterRepository extends BaseRepository<Meter> {}
