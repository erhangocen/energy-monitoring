export class MeterReadingDto {
  id: string;
  meterId: string;
  timestamp: Date;
  indexKwh: number;
  consumptionKwh: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<MeterReadingDto>) {
    Object.assign(this, partial);
  }
}
