import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
