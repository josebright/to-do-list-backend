import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { createDto, updateDto } from './dto';
import {
  UserJwtGuard,
  RolesGuard,
  Roles,
} from '../auth/guard';
import { UserRoles } from '../user/enums';

@Controller('api/to-do')
export class ToDoController {
  constructor(
    private readonly toDoService: ToDoService,
  ) {}

  @UseGuards(UserJwtGuard)
  @Post()
  createList(@Body() dto: createDto, @Req() req) {
    return this.toDoService.createList(dto, req);
  }

  @UseGuards(UserJwtGuard)
  @Get()
  findUserList(@Req() req) {
    return this.toDoService.findUserList(req);
  }

  @UseGuards(UserJwtGuard, RolesGuard)
  @Roles(UserRoles.ADMIN) //Only Admin user can access
  @Get('lists')
  findAllUserList() {
    return this.toDoService.findAllUserList();
  }

  @UseGuards(UserJwtGuard)
  @Get(':id')
  findOneList(
    @Param() params: { id: string },
    @Req() req,
  ) {
    return this.toDoService.findOneList(
      params.id,
      req,
    );
  }

  @UseGuards(UserJwtGuard)
  @Patch(':id')
  updateList(
    @Param('id') id: string,
    @Body() dto: updateDto,
    @Req() req,
  ) {
    return this.toDoService.updateList(
      id,
      dto,
      req,
    );
  }

  @UseGuards(UserJwtGuard)
  @Delete(':id')
  deleteList(
    @Param() params: { id: string },
    @Req() req,
  ) {
    return this.toDoService.deleteList(
      params.id,
      req,
    );
  }
}
