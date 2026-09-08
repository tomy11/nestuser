import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ERROR_MESSAGES } from '../utils/constants';
import { AuthUserPayload, JwtPayload } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthUserPayload | null> {
    if (!username || !pass) {
      throw new BadRequestException(ERROR_MESSAGES.MISSING_CREDENTIALS);
    }
    const user = await this.userService.findOneUser(username);
    if (!user || user.password !== pass) {
      this.logger.warn(`Failed login attempt for username: ${username}`);
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: AuthUserPayload): Promise<{ access_token: string }> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
