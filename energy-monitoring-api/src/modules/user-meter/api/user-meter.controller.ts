import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMeterService } from '../application/use-cases/user-meter.service';
import { CreateUserMeterDto } from '../application/dtos/create-user-meter.dto';
import { DeleteUserMeterDto } from '../application/dtos/delete-user-meter.dto';
import { UserMeterDto } from '../application/dtos/user-meter.dto';
import { JwtAuthGuard } from '../../auth/utils/jwt/jwt.guard';
import { RolesGuard } from '../../auth/utils/jwt/roles.guard';
import { Roles } from '../../auth/utils/decorators/roles.decorator';

@ApiTags('UserMeter')
@ApiBearerAuth()
@Controller('user-meter')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserMeterController {
  constructor(private userMeterService: UserMeterService) {}

  @Post()
  @Roles('admin')
  @ApiResponse({
    status: 201,
    description: 'User meter association created successfully.',
  })
  async create(@Body() req: CreateUserMeterDto): Promise<UserMeterDto> {
    return await this.userMeterService.create(req);
  }

  @Delete()
  @Roles('admin')
  @ApiResponse({
    status: 200,
    description: 'User meter association deleted successfully.',
  })
  async delete(@Body() req: DeleteUserMeterDto): Promise<boolean> {
    return await this.userMeterService.delete(req);
  }
}
