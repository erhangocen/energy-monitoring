import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserMeterDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  meterId: string;
}
