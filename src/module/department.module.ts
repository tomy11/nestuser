import { Module } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { DepartmentController } from '../controller/department.controller';

@Module({
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [DepartmentService]
})
export class DepartmentModule {}
