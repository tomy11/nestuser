import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyService } from '../services/company.service';
import {
  CompanyDto,
  CompanySectionDto,
  CompanySectionMemberDto,
} from '../dto/company.dto';

@ApiTags('company')
@ApiBearerAuth()
@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiOperation({ summary: 'Get all companies' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanys(): Promise<CompanyDto[]> {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ summary: 'Get all company sections' })
  @UseGuards(JwtAuthGuard)
  @Get('/company-section')
  async getAllCompanySection(): Promise<CompanySectionDto[]> {
    return this.companyService.getAllCompanySection();
  }

  @ApiOperation({ summary: 'Get all company section members' })
  @UseGuards(JwtAuthGuard)
  @Get('/company-section-member')
  async getAllCompanySectionMember(): Promise<CompanySectionMemberDto[]> {
    return this.companyService.getAllCompanySectionMember();
  }
}
