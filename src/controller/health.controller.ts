import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('api/v1/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeorm: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.typeorm.pingCheck('database', { timeout: 3000 }),
    ]);
  }
}
