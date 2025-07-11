import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: ['admin', 'user'] })
  role: 'admin' | 'user';
  @ApiProperty({ required: false })
  organizationId?: string | null;
}
