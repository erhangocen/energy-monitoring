import { ApiProperty } from '@nestjs/swagger';

export class CreateMeterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  organizationId: string;
}
