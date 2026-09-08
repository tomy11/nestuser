import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../utils/local-auth.guard';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login and get JWT access token' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
