import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto, UserListDto } from '../dto/user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users with section and department info' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UserListDto[]> {
    return this.userService.getAllUser();
  }

  @ApiOperation({ summary: 'Get raw user table rows' })
  @UseGuards(JwtAuthGuard)
  @Get('/thaioiluserall')
  async getAllTableUsr(): Promise<UserDto[]> {
    return this.userService.getAllTableUser();
  }
}
