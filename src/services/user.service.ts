import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ERROR_MESSAGES } from '../utils/constants';
import { UserDto, UserListDto } from '../dto/user.dto';
import { AuthUser } from '../dto/auth.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  private toAppError(message: string, error: unknown): Error {
    this.logger.error(`${message}:`, error);
    return new Error(message);
  }

  async getAllUser(): Promise<UserListDto[]> {
    try {
      const sqlQuery =
        'SELECT ju.employee_id as employee, ju.ad_account,\n' +
        'ju.fk_company_id,\n' +
        'jc.company_name_th,\n' +
        'ju.fk_department_id,\n' +
        'jcd.department_name,\n' +
        'ju.position,\n' +
        'ju.th_title,\n' +
        'ju.th_first_name,\n' +
        'ju.th_last_name,\n' +
        'ju.is_active,\n' +
        "SUBSTRING_INDEX(SUBSTRING_INDEX(ju.display_name, '.', 1), '.', -1) AS title_en,\n" +
        'ju.first_name,\n' +
        'ju.last_name,\n' +
        "IF((( ju.alias_name IS NOT NULL ) AND (length( ju.alias_name ) > 0 )),concat( ju.display_name, ' (', ju.alias_name, ')' ),ju.display_name ) AS employee_name,\n" +
        'ju.email,\n' +
        'jcs.section_name,\n' +
        'ju.report_to_id\n' +
        'FROM users ju\n' +
        'LEFT JOIN company jc ON jc.company_id = ju.fk_company_id\n' +
        'LEFT JOIN company_department jcd ON jcd.department_id = ju.fk_department_id\n' +
        'INNER JOIN company_section_member jcsm ON jcsm.fk_user_id = ju.id \n' +
        'INNER JOIN company_section jcs ON jcs.id = jcsm.fk_section_id\n' +
        'WHERE ju.employee_id IS NOT NULL\n' +
        'GROUP BY jcsm.fk_user_id, jcs.section_name, jcd.department_name\n' +
        'ORDER BY ju.employee_id;';
      //"SELECT * FROM users";
      const result = (await this.connection.query(sqlQuery)) as UserListDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.USER_QUERY_FAILED, error);
    }
  }

  async findOneUser(username: string): Promise<AuthUser | undefined> {
    const usernameEnv = process.env.AUTH_USERNAME || 'authuser';
    const passwordEnv = process.env.AUTH_PASSWORD || '';
    if (username === usernameEnv) {
      return { userId: 1, username: usernameEnv, password: passwordEnv };
    }
    return undefined;
  }

  async getAllTableUser(): Promise<UserDto[]> {
    try {
      const sqlQuery = 'SELECT * FROM users';
      const result = (await this.connection.query(sqlQuery)) as UserDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.USER_TABLE_QUERY_FAILED, error);
    }
  }
}
