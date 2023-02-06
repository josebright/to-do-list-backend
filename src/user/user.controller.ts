import { 
    Controller, 
    Get, 
    Delete,
    Param, 
    Req, 
    UseGuards,
} from '@nestjs/common';
import { UserJwtGuard, AdminRoleGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('api/users')
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

    @UseGuards(AdminRoleGuard)
    @Delete(':id')
    deleteUser(
        @Param() params: { id: string },
        ) {
        return this.usersService.deleteUser(params.id);
    }
}
