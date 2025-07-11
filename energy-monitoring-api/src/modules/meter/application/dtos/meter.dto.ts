import { ApiProperty } from '@nestjs/swagger';

export class MeterDto {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<MeterDto>) {
    Object.assign(this, partial);
  }
}

export class MeterListFilterDto {
  @ApiProperty()
  organizationId?: string;
  @ApiProperty()
  search?: string;
}
