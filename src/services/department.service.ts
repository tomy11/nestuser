import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ERROR_MESSAGES } from '../utils/constants';
import { DepartmentDto } from '../dto/department.dto';

@Injectable()
export class DepartmentService {
  private readonly logger = new Logger(DepartmentService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  private toAppError(message: string, error: unknown): Error {
    this.logger.error(`${message}:`, error);
    return new Error(message);
  }

  async getAllDepartment(): Promise<DepartmentDto[]> {
    try {
      const sqlQuery = 'SELECT * FROM company_department';
      const result = (await this.connection.query(sqlQuery)) as DepartmentDto[];
      return result;
    } catch (error) {
      throw this.toAppError(ERROR_MESSAGES.DEPARTMENT_QUERY_FAILED, error);
    }
  }
}
