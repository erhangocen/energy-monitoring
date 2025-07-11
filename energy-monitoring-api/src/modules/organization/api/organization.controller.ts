import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { OrganizationService } from '../application/use-cases/organizaton.service';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrganizationDto } from '../application/dtos/create-organization.dto';
import { JwtAuthGuard } from '../../auth/utils/jwt/jwt.guard';
import { RolesGuard } from '../../auth/utils/jwt/roles.guard';
import { Roles } from '../../auth/utils/decorators/roles.decorator';
import { UpdateOrganizationDto } from '../application/dtos/update-organization.dto';

@ApiTags('Organization')
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiResponse({ status: 201, description: 'Organization oluşturuldu' })
  create(@Body() dto: CreateOrganizationDto) {
    return this.organizationService.create(dto);
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Body() dto: UpdateOrganizationDto) {
    return this.organizationService.update(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Query('id') id: string) {
    return this.organizationService.delete(id);
  }

  @Post('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.organizationService.findById(id);
  }
}
