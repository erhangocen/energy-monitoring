import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from '../application/dtos/login.dto';
import { AuthService } from '../application/use-cases/auth.service';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../utils/jwt/roles.guard';
import { JwtAuthGuard } from '../utils/jwt/jwt.guard';
import { Roles } from '../utils/decorators/roles.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiResponse({
    status: 201,
    description: 'Kullanıcı başarılı bir şekilde giriş sağladı.',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('create-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 201, description: 'Kullanıcı oluşturuldu' })
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Delete('delete-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 201, description: 'Kullanıcı silindi' })
  async deleteUser(@Query('id') id: string) {
    await this.authService.deleteUser(id);
  }
}


