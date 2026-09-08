import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from '../services/department.service';
import { DepartmentDto } from '../dto/department.dto';

@ApiTags('department')
@ApiBearerAuth()
@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: 'Get all departments' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllDepartments(): Promise<DepartmentDto[]> {
    return this.departmentService.getAllDepartment();
  }
}
