import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { DepartmentService } from '../services/department.service';
import { DepartmentDto } from '../dto/department.dto';

@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllDepartments(): Promise<DepartmentDto[]> {
    return this.departmentService.getAllDepartment();
  }
}
