import { Controller, Dependencies, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PrismaService } from '../persistence/prisma/prisma.service';

@Controller('health')
@Dependencies(
  HealthCheckService,
  HttpHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
  PrismaService
)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaClient: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.disk.checkStorage('disk_percentage_health', { path: '/', thresholdPercent: 0.1 }),
      () => this.disk.checkStorage('disk_space_health', { threshold: 100 * 1024 * 1024 * 1024, path: '/' }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.prisma.pingCheck('prisma', this.prismaClient, { timeout: 300 }),
    ]);
  }
}
