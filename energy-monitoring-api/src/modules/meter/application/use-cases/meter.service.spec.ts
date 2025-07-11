import { Test, TestingModule } from '@nestjs/testing';
import { MeterService } from './meter.service';
import { MeterRepository } from '../../domain/interfaces/meter.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Meter } from '../../domain/entities/meter.entity';
import { MeterDto } from '../dtos/meter.dto';
import { NotFoundException } from '@nestjs/common';

describe('MeterService', () => {
  let service: MeterService;
  let repo: jest.Mocked<MeterRepository>;
  // let prisma: jest.Mocked<PrismaService>; // Removed unused variable

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<MeterRepository>> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const prismaMock: Partial<jest.Mocked<PrismaService>> = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeterService,
        { provide: MeterRepository, useValue: repoMock },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get(MeterService);
    repo = module.get(MeterRepository);
    // prisma = module.get(PrismaService); // Removed unused variable
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call repo.create and return MeterDto', async () => {
    const dto = { name: 'METER-001', organizationId: 'org-1' };
    const meter = new Meter(dto.name, dto.organizationId);
    (repo.create as jest.Mock).mockResolvedValue({
      ...meter,
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(MeterDto);
    expect(result.name).toBe(dto.name);
  });

  it('findAll should return MeterDto[]', async () => {
    const meters = [
      {
        id: '1',
        name: 'METER-001',
        organizationId: 'org-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'METER-002',
        organizationId: 'org-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (repo.findAll as jest.Mock).mockResolvedValue(meters);
    const result = await service.findAll();
    expect(repo.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(MeterDto);
  });

  it('findById should return MeterDto if found', async () => {
    const meter = {
      id: '1',
      name: 'METER-001',
      organizationId: 'org-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (repo.findById as jest.Mock).mockResolvedValue(meter);
    const result = await service.findById('1');
    expect(repo.findById).toHaveBeenCalledWith('1');
    expect(result).toBeInstanceOf(MeterDto);
    expect(result.id).toBe('1');
  });

  it('findById should throw NotFoundException if not found', async () => {
    (repo.findById as jest.Mock).mockResolvedValue(null);
    await expect(service.findById('not-exist')).rejects.toThrow(
      NotFoundException,
    );
  });
});
