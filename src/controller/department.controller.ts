import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { DepartmentService } from '../services/department.service';

@Controller('api/v1/department')
export class DepartmentController {
    constructor(
        private readonly departmentService: DepartmentService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllDepartments(): Promise<any[]> {
        try {
            const result: any = await this.departmentService.getAllDepartment();
            return result;
        } catch (error) {
            console.log('error ', error);
        }
    }
}
