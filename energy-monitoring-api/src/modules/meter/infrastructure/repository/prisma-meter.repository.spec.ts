import { Test, TestingModule } from '@nestjs/testing';
import { PrismaMeterRepository } from './prisma-meter.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Meter } from '../../domain/entities/meter.entity';

const mockPrisma = {
  meter: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PrismaMeterRepository', () => {
  let repo: PrismaMeterRepository;
  // let prisma: PrismaService; // Removed unused variable

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaMeterRepository,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    repo = module.get(PrismaMeterRepository);
    // prisma = module.get(PrismaService); // Removed unused variable
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('findById should call prisma.meter.findUnique with correct params', async () => {
    mockPrisma.meter.findUnique.mockResolvedValue({
      id: '1',
      isDeleted: false,
    });
    await repo.findById('1');
    expect(mockPrisma.meter.findUnique).toHaveBeenCalledWith({
      where: { id: '1', isDeleted: false },
    });
  });

  it('findAll should call prisma.meter.findMany with correct params', async () => {
    mockPrisma.meter.findMany.mockResolvedValue([]);
    await repo.findAll();
    expect(mockPrisma.meter.findMany).toHaveBeenCalledWith({
      where: { isDeleted: false },
    });
  });

  it('create should call prisma.meter.create with correct data', async () => {
    const meter = new Meter('METER-001', 'org-1');
    mockPrisma.meter.create.mockResolvedValue(meter);
    await repo.create(meter);
    expect(mockPrisma.meter.create).toHaveBeenCalledWith({ data: meter });
  });

  it('update should call prisma.meter.update with correct params', async () => {
    const meter = { id: '1', name: 'METER-001', organizationId: 'org-1' };
    mockPrisma.meter.update.mockResolvedValue(meter);
    await repo.update(meter as any);
    expect(mockPrisma.meter.update).toHaveBeenCalledWith({
      where: { id: meter.id },
      data: meter,
    });
  });

  it('delete should call prisma.meter.update to soft delete', async () => {
    mockPrisma.meter.update.mockResolvedValue({});
    await repo.delete('1');
    expect(mockPrisma.meter.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { isDeleted: true },
    });
  });
});
