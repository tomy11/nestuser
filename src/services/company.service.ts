import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getAllCompany(): Promise<any[]> {
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
        'FROM jnzhr_company';

      const result: any = await this.connection.query(sqlQuery);
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
