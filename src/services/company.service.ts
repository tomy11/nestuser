import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ERROR_MESSAGES } from '../utils/constants';
import {
  CompanyDto,
  CompanySectionDto,
  CompanySectionMemberDto,
} from '../dto/company.dto';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  private toAppError(message: string, error: unknown): Error {
    this.logger.error(`${message}:`, error);
    return new Error(message);
  }

  async getAllCompany(): Promise<CompanyDto[]> {
    try {
      const sqlQuery =
        'SELECT \n' +
        'company_id,\n' +
        'company_name_th,\n' +
        'company_name_en,\n' +
        'company_address,\n' +
        'company_phone,\n' +
        'company_tax_id,\n' +
        'fk_currency_id,\n' +
        'fk_timezone_id,\n' +
        'fk_package_id,\n' +
        'package_member,\n' +
        'suffix_email,\n' +
        'url_user_register,\n' +
        'qrcode_user_register,\n' +
        'working_hours,\n' +
        'allow_late_mins,\n' +
        'wizard_setting,\n' +
        'fk_company_group,\n' +
        'fk_customer_status\n' +
        'FROM company';

      const result = (await this.connection.query(sqlQuery)) as CompanyDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.COMPANY_QUERY_FAILED, error);
    }
  }

  async getAllCompanySection(): Promise<CompanySectionDto[]> {
    try {
      const sqlQuery = 'SELECT * FROM company_section';
      const result = (await this.connection.query(
        sqlQuery,
      )) as CompanySectionDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.SECTION_QUERY_FAILED, error);
    }
  }

  async getAllCompanySectionMember(): Promise<CompanySectionMemberDto[]> {
    try {
      const sqlQuery = 'SELECT * FROM company_section_member';
      const result = (await this.connection.query(
        sqlQuery,
      )) as CompanySectionMemberDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.SECTION_MEMBER_QUERY_FAILED, error);
    }
  }
}
