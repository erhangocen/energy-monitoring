import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty({ required: false })
  organizationId?: string | null;

  @IsString()
  @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user' = 'user'; // Default role is 'user'
}
