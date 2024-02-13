import { Test, TestingModule } from '@nestjs/testing';

import { AppConfig } from '@/core/config/app-config';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AppConfig],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
