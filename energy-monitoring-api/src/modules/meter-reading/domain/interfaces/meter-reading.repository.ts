import { BaseRepository } from 'src/shared/domain/base.repository';
import { MeterReading } from '../entities/meter-reading.entity';

export abstract class MeterReadingRepository extends BaseRepository<MeterReading> {
  abstract findWithMeterId(meterId: string): Promise<MeterReading[]>;
}
