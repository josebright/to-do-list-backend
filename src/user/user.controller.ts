import { 
    Controller, 
    Get, 
    Param, 
    Req, 
    UseGuards,
} from '@nestjs/common';
import { UserJwtGuard, AdminRoleGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    
    @UseGuards(UserJwtGuard) 
    @Get(':id')
    getUser(
        @Param() params: { id: string }, 
        @Req() req
        ) {
        return this.usersService.getUser(params.id, req);
    }

    @UseGuards(AdminRoleGuard) 
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }
}
