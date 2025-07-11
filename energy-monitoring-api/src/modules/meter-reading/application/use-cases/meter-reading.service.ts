import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { MeterReadingRepository } from '../../domain/interfaces/meter-reading.repository';
import { CreateMeterReadingDto } from '../dtos/create-meter-reading.dto';
import { MeterReadingDto } from '../dtos/meter-reading.dto';
import { MeterReading } from '../../domain/entities/meter-reading.entity';

@Injectable()
export class MeterReadingService {
  constructor(private readonly repo: MeterReadingRepository) {}

  async create(data: CreateMeterReadingDto): Promise<MeterReadingDto> {
    const prevReadings = await this.repo.findWithMeterId(data.meterId);

    let prevIndex = 0;
    if (prevReadings.length > 0) {
      const latestTimestamp = prevReadings[0].timestamp;
      const readingsAtSameTime = prevReadings.filter(
        (r) => r.timestamp.getTime() === latestTimestamp.getTime(),
      );
      prevIndex = Math.max(...readingsAtSameTime.map((r) => r.indexKwh));
    }

    if (data.indexKwh < prevIndex) {
      throw new BadRequestException(
        'Yeni okuma, önceki okumadan küçük olamaz!',
      );
    }

    const consumption = data.indexKwh - prevIndex;
    const reading = new MeterReading(
      data.meterId,
      data.timestamp ? new Date(data.timestamp) : new Date(),
      data.indexKwh,
      consumption,
    );
    const created = await this.repo.create(reading);
    return new MeterReadingDto({
      id: created.id,
      meterId: created.meterId,
      timestamp: created.timestamp,
      indexKwh: created.indexKwh,
      consumptionKwh: created.consumptionKwh,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findAll(): Promise<MeterReadingDto[]> {
    const readings = await this.repo.findAll();
    return readings.map(
      (r) =>
        new MeterReadingDto({
          id: r.id,
          meterId: r.meterId,
          timestamp: r.timestamp,
          indexKwh: r.indexKwh,
          consumptionKwh: r.consumptionKwh,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<MeterReadingDto> {
    const reading = await this.repo.findById(id);
    if (!reading) {
      throw new NotFoundException('Meter reading not found');
    }
    return new MeterReadingDto({
      id: reading.id,
      meterId: reading.meterId,
      timestamp: reading.timestamp,
      indexKwh: reading.indexKwh,
      consumptionKwh: reading.consumptionKwh,
    });
  }
}
