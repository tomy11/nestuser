import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async getAll(): Promise<any[]> {
        try {
            const result: any = await this.userService.getAllUser();
            return result;
        } catch (error) {
            console.log('error ', error);
        }
    }
}
