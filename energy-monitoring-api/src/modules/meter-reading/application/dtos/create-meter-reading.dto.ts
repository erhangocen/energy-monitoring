import { ApiProperty } from '@nestjs/swagger';

export class CreateMeterReadingDto {
  @ApiProperty()
  meterId: string;

  @ApiProperty({ required: false })
  timestamp?: Date;

  @ApiProperty()
  indexKwh: number;
}
