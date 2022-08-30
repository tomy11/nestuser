import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}
    
    @Get()
    async getAll(): Promise<any[]> {
        try {
            const result: any = await this.departmentService.getAllDepartment();
            return result;
        } catch (error) {
            console.log('error ', error);
        }
    }
}
