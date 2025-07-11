import { BaseEntity } from 'src/shared/domain/base.entity';

export class MeterReading extends BaseEntity {
  constructor(
    public readonly meterId: string,
    public readonly timestamp: Date,
    public readonly indexKwh: number,
    public readonly consumptionKwh: number,
  ) {
    super();
  }
}
