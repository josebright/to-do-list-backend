import { 
  Controller, 
  Get, 
  Post, 
  Body,
  Req,
  Patch, 
  Param, 
  Delete,
  UseGuards 
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto, UpdateToDoDto } from './dto';
import { UserJwtGuard, AdminRoleGuard } from '../auth/guard';


@Controller('api/to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @UseGuards(UserJwtGuard)
  @Post()
  create(
    @Body() dto: CreateToDoDto, @Req() req
  ) {
    return this.toDoService.create(
      dto, 
      req
    );
  }

  @Get()
  findAll() {
    return this.toDoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(+id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(+id);
  }
}
