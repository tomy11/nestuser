import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { DepartmentModule } from './department.module';
import { CompanyModule } from './company.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'happyworkpro',
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    DepartmentModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
