import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getAllDepartment(): Promise<any[]> {
    try {
      const sqlQuery = 'SELECT * FROM jnzhr_company_department';
      const result: any = await this.connection.query(sqlQuery);
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
