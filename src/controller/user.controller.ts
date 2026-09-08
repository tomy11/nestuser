import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { UserDto, UserListDto } from '../dto/user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UserListDto[]> {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/thaioiluserall')
  async getAllTableUsr(): Promise<UserDto[]> {
    return this.userService.getAllTableUser();
  }
}
