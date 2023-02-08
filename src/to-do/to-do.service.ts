import { Injectable } from '@nestjs/common';
import { CreateToDoDto, UpdateToDoDto } from './dto';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import jwt_decode from "jwt-decode";


@Injectable()
export class ToDoService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateToDoDto,
    req: Request
  ) {
    const decoded: object = jwt_decode(req.cookies.token);
    const decodedUser = decoded as { id: string, email: string }
    const { item } = dto
    try {
      await this.prisma.listItem.create({
          data: {
            userId: decodedUser.id,
            item,
          }
      });

      return {
          message: 'List created succefully'
      };

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
