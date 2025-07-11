import { ApiProperty } from '@nestjs/swagger';

export class CreateUserMeterDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  meterId: string;
}
