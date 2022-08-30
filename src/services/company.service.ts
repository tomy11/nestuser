import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectConnection() private readonly connection: Connection
    ) {}

    async getAllCompany(): Promise<any[]> {
        try {
            let sqlQuery = "SELECT * FROM jnzhr_company";
            let result:any = await this.connection.query(sqlQuery);
            return result;
        } catch (error) {
            console.log('error ', error);
        }
    }
}
