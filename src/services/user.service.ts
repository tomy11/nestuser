import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

export type User = any;
@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'authuser',
      password: 'f%ZH$$9CqDp<',
    },
    {
      userId: 2,
      username: 'happy',
      password: 'f%ZH$$9CqDp<',
    },
  ];
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getAllUser(): Promise<any[]> {
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
        'FROM jnzhr_users ju\n' +
        'LEFT JOIN jnzhr_company jc ON jc.company_id = ju.fk_company_id\n' +
        'LEFT JOIN jnzhr_company_department jcd ON jcd.department_id = ju.fk_department_id\n' +
        'INNER JOIN jnzhr_company_section_member jcsm ON jcsm.fk_user_id = ju.id \n' +
        'INNER JOIN jnzhr_company_section jcs ON jcs.id = jcsm.fk_section_id\n' +
        'WHERE ju.employee_id IS NOT NULL\n' +
        'GROUP BY jcsm.fk_user_id, jcs.section_name, jcd.department_name\n' +
        'ORDER BY ju.employee_id;';
      //"SELECT * FROM jnzhr_users";
      const result: any = await this.connection.query(sqlQuery);
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getAllTableUser() {
    try {
      const sqlQuery = 'SELECT * FROM jnzhr_users';
      const result: any = await this.connection.query(sqlQuery);
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
