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
import { Dto } from './dto';
import { UserJwtGuard } from '../auth/guard';

@Controller('api/to-do')
export class ToDoController {
  constructor(
    private readonly toDoService: ToDoService,
  ) {}

  @UseGuards(UserJwtGuard)
  @Post()
  createList(@Body() dto: Dto, @Req() req) {
    return this.toDoService.createList(dto, req);
  }

  @UseGuards(UserJwtGuard)
  @Get()
  findUserList(@Req() req) {
    return this.toDoService.findUserList(req);
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

  @Patch(':id')
  updateList(
    @Param('id') id: string,
    @Body() dto: Dto,
  ) {
    return this.toDoService.updateList(id, dto);
  }

  @Delete(':id')
  deleteList(@Param('id') id: string) {
    return this.toDoService.deleteList(id);
  }
}
