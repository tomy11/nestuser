import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { DepartmentModule } from './department.module';
import { CompanyModule } from './company.module';
import { AuthModule } from './auth.module';
import { HealthModule } from './health.module';
import { ConfigModule } from '@nestjs/config';
import { EnvValidationService } from '../services/env-validation.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
      }),
    }),
    AuthModule,
    UserModule,
    DepartmentModule,
    CompanyModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvValidationService],
})
export class AppModule {}
