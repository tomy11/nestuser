import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { CompanyService } from '../services/company.service';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanys(): Promise<any[]> {
    try {
      const result: any = await this.companyService.getAllCompany();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/company-section')
  async getAllCompanySection(): Promise<any[]> {
    try {
      const result: any = await this.companyService.getAllCompanySection();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/company-section-member')
  async getAllCompanySectionMember(): Promise<any[]> {
    try {
      const result: any =
        await this.companyService.getAllCompanySectionMember();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
