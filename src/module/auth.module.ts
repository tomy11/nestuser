import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../utils/local.strategy';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { JwtStrategy } from '../utils/jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),

  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, UserService]
})
export class AuthModule {}
