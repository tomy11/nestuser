import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { CompanyService } from '../services/company.service';
import {
  CompanyDto,
  CompanySectionDto,
  CompanySectionMemberDto,
} from '../dto/company.dto';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanys(): Promise<CompanyDto[]> {
    return this.companyService.getAllCompany();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/company-section')
  async getAllCompanySection(): Promise<CompanySectionDto[]> {
    return this.companyService.getAllCompanySection();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/company-section-member')
  async getAllCompanySectionMember(): Promise<CompanySectionMemberDto[]> {
    return this.companyService.getAllCompanySectionMember();
  }
}
