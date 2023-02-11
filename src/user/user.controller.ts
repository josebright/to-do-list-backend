import {
  Controller,
  Get,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  UserJwtGuard,
  RolesGuard,
  Roles,
} from '../auth/guard';
import { UserRoles } from './enums';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
  ) {}

  @UseGuards(UserJwtGuard)
  @Get(':id')
  getUser(
    @Param() params: { id: string },
    @Req() req,
  ) {
    return this.usersService.getUser(
      params.id,
      req,
    );
  }

  @UseGuards(UserJwtGuard, RolesGuard)
  @Roles(UserRoles.ADMIN) // Only aadmin can access
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(UserJwtGuard, RolesGuard)
  @Roles(UserRoles.ADMIN) // Only admin can access
  @Delete(':id')
  deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(
      params.id,
    );
  }
}
