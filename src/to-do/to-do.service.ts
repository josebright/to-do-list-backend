import { Injectable } from '@nestjs/common';
import { CreateToDoDto, UpdateToDoDto } from './dto';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


@Injectable()
export class ToDoService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateToDoDto,
    res: Response
  ) {
    const { items } = dto
    try {
      await this.prisma.toDoList.create({
          data: {
            user: {
              
            },
            items,
          }
      });

      return res.send({
          message: 'List created succefully'
      });

    } catch (error) {

      throw error;
    }
  }

  findAll() {
    return `This action returns all toDo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
