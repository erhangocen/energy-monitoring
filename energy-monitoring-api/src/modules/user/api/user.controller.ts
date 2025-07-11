import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../application/use-cases/user.service';
import { Roles } from 'src/modules/auth/utils/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/utils/jwt/jwt.guard';
import { RolesGuard } from 'src/modules/auth/utils/jwt/roles.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri' })
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('list')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Kullanıcı listesi' })
  async getUsers() {
    return this.userService.findAll();
  }
}
