import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Dto } from './dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import jwt_decode from 'jwt-decode';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) {}

  async createList(dto: Dto, req: Request) {
    const decoded: object = jwt_decode(
      req.cookies.token,
    );
    const decodedUser = decoded as {
      id: string;
      email: string;
    };
    const { item } = dto;
    try {
      await this.prisma.listItem.create({
        data: {
          userId: decodedUser.id,
          item,
        },
      });

      return {
        message: 'List created succefully',
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserList(req: Request) {
    const decoded: object = jwt_decode(
      req.cookies.token,
    );
    const decodedUser = decoded as {
      id: string;
      email: string;
    };

    const lists =
      await this.prisma.listItem.findMany({
        where: {
          userId: decodedUser.id,
        },
      });

    if (!lists) {
      throw new NotFoundException(
        'List not found',
      );
    }

    return { lists };
  }

  async findOneList(id: string, req: Request) {
    const decoded: object = jwt_decode(
      req.cookies.token,
    );
    const decodedUser = decoded as {
      id: string;
      email: string;
    };
    const list =
      await this.prisma.listItem.findUnique({
        where: {
          id,
        },
      });

    if (!list) {
      throw new NotFoundException(
        'List not found',
      );
    }

    if (decodedUser.id !== list.userId) {
      throw new ForbiddenException(
        'Unauthorized',
      );
    }

    return { list };
  }

  async updateList(id: string, dto: Dto) {
    return `This action updates a #${id} toDo`;
  }

  async deleteList(id: string) {
    return `This action removes a #${id} toDo`;
  }
}
