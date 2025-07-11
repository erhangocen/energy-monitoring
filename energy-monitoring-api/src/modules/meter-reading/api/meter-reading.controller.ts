import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MeterReadingService } from '../application/use-cases/meter-reading.service';
import { CreateMeterReadingDto } from '../application/dtos/create-meter-reading.dto';
import { JwtAuthGuard } from '../../auth/utils/jwt/jwt.guard';

@ApiTags('MeterReading')
@ApiBearerAuth()
@Controller('meter-reading')
export class MeterReadingController {
  constructor(private readonly meterReadingService: MeterReadingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { ttl: 60000, limit: 30 } }) // 1 dakikada maksimum 30 okuma ekleme
  @ApiResponse({ status: 201, description: 'Sayaç okuma eklendi' })
  create(@Body() dto: CreateMeterReadingDto) {
    return this.meterReadingService.create(dto);
  }

  @Post('list')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Tüm sayaç okumaları' })
  findAll() {
    return this.meterReadingService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Sayaç okuma detayı' })
  findById(@Param('id') id: string) {
    return this.meterReadingService.findById(id);
  }
}
