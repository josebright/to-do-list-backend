import { 
  Controller, 
  Get, 
  Post, 
  Body,
  Req, 
  Res, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto, UpdateToDoDto } from './dto';

@Controller('api/to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  create(
    @Body() dto: CreateToDoDto, @Res() res
  ) {
    return this.toDoService.create(
      dto, 
      res
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
