import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { OrganizationDto } from '../dtos/organization.dto';
import { OrganizationRepository } from '../../domain/interfaces/organization.repository';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';
import { Organization } from '../../domain/entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(private readonly repo: OrganizationRepository) {}

  async create(data: CreateOrganizationDto): Promise<OrganizationDto> {
    const organization: Organization = new Organization(data.name);

    const created = await this.repo.create(organization);

    const response: OrganizationDto = new OrganizationDto({
      id: created.id,
      name: created.name,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
    return response;
  }

  async findAll(): Promise<OrganizationDto[]> {
    const orgs = await this.repo.findAll();
    return orgs.map(
      (org) =>
        new OrganizationDto({
          id: org.id,
          name: org.name,
          createdAt: org.createdAt,
          updatedAt: org.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<OrganizationDto> {
    const org = await this.repo.findById(id);
    if (!org) {
      throw new NotFoundException('Organization not found');
    }
    return new OrganizationDto({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    });
  }
  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async update(data: UpdateOrganizationDto): Promise<OrganizationDto> {
    const organization: Organization = {
      id: data.id,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    const updated = await this.repo.update(organization);

    return new OrganizationDto({
      id: updated.id,
      name: updated.name,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }
}
