import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { UserService } from '../services/user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<any[]> {
    try {
      const result: any = await this.userService.getAllUser();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/thaioiluserall')
  async getAllTableUsr(): Promise<any[]> {
    try {
      const result: any = await this.userService.getAllTableUser();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
