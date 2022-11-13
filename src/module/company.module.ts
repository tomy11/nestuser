import { Module } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CompanyController } from '../controller/company.controller';

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
