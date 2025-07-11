import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrganizationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
