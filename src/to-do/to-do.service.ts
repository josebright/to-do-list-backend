import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import jwt_decode from 'jwt-decode';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) {}

  async createList(dto: createDto, req: Request) {
    const decodedUser: any =
      this.decodedUser(req);
    const { item } = dto;

    await this.prisma.listItem.create({
      data: {
        userId: decodedUser.id,
        item,
      },
    });

    return {
      message: 'List created succefully',
    };
  }

  async findUserList(req: Request) {
    const decodedUser: any =
      this.decodedUser(req);

    const lists =
      await this.prisma.listItem.findMany({
        where: {
          userId: decodedUser.id,
        },
      });

    if (lists.length === 0) {
      return { message: 'List is empty' };
    }

    return { lists };
  }

  async findAllUserList() {
    const lists =
      await this.prisma.listItem.findMany({
        select: {
          id: true,
          item: true,
          hasClickedTranslate: true,
          status: true,
          translatedList: true,
        },
      });

    if (!lists) {
      return { message: 'List not found' };
    }

    return { lists };
  }

  async findOneList(id: string, req: Request) {
    const decodedUser: any =
      this.decodedUser(req);

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

  async updateList(
    id: string,
    dto: updateDto,
    req: Request,
  ) {
    const decodedUser: any =
      this.decodedUser(req);

    const updateList =
      await this.prisma.listItem.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });

    if (decodedUser.id !== updateList.userId) {
      throw new ForbiddenException(
        'Unauthorized',
      );
    }

    return { updateList };
  }

  async deleteList(id: string, req: Request) {
    const decodedUser: any =
      this.decodedUser(req);

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

    await this.prisma.listItem.delete({
      where: {
        id: list.id,
      },
    });
    return {
      message: `List with ID: #${id} deleted`,
    };
  }

  decodedUser(req: Request) {
    const decoded: object = jwt_decode(
      req.cookies.token,
    );

    return decoded as {
      id: string;
      email: string;
    };
  }
}
