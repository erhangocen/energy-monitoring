import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MeterService } from '../application/use-cases/meter.service';
import { CreateMeterDto } from '../application/dtos/create-meter.dto';
import { JwtAuthGuard } from '../../auth/utils/jwt/jwt.guard';
import { RolesGuard } from '../../auth/utils/jwt/roles.guard';
import { Roles } from '../../auth/utils/decorators/roles.decorator';
import { MeterListFilterDto } from '../application/dtos/meter.dto';
import { CurrentUser } from '../../auth/utils/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/modules/auth/application/dtos/current-user.dto';

@ApiTags('Meter')
@ApiBearerAuth()
@Controller('meter')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 201, description: 'Sayaç oluşturuldu' })
  create(@Body() dto: CreateMeterDto) {
    return this.meterService.create(dto);
  }

  @Post('list')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Sayaçlar listelendi' })
  findAll(
    @CurrentUser() user: CurrentUserDto,
    @Body() filter: MeterListFilterDto,
  ) {
    return this.meterService.filteredList(user, filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Sayaç detayı' })
  findById(@Param('id') id: string) {
    return this.meterService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Sayaç silindi' })
  delete(@Param('id') id: string) {
    return this.meterService.delete(id);
  }
}
