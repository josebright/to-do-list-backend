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
    // store the user id and email
    const decodedUser: any =
      this.decodedUser(req);
    const { item } = dto;

    // create list with user information
    const todo =
      await this.prisma.listItem.create({
        data: {
          userId: decodedUser.id,
          item,
        },
      });

    return {
      message: 'List created succefully',
      todo,
    };
  }

  async findUserList(req: Request) {
    // store the user id and email
    const decodedUser: any =
      this.decodedUser(req);

    // check listiem with user id
    const lists =
      await this.prisma.listItem.findMany({
        where: {
          userId: decodedUser.id,
        },
      });

    // validate If list item is empty
    if (lists.length === 0) {
      return { message: 'List is empty' };
    }

    return { lists };
  }

  async findAllUserList() {
    // find all list items
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

    // validate if list exist
    if (!lists) {
      return { message: 'List not found' };
    }

    return { lists };
  }

  async findOneList(id: string, req: Request) {
    // store the user id and email
    const decodedUser: any =
      this.decodedUser(req);

    // use the list id to get the list information
    const list =
      await this.prisma.listItem.findUnique({
        where: {
          id,
        },
      });

    // validate if list exist
    if (!list) {
      throw new NotFoundException(
        'List not found',
      );
    }

    // check if the user owns the list before returning the list
    if (decodedUser.id !== list.userId) {
      throw new ForbiddenException(
        'Forbidden resource',
      );
    }

    return { list };
  }

  async updateList(
    id: string,
    dto: updateDto,
    req: Request,
  ) {
    // store the user id and email
    const decodedUser: any =
      this.decodedUser(req);

    // use the list id to fetch the list information
    const list =
      await this.prisma.listItem.findUnique({
        where: {
          id,
        },
      });

    // check if the user owns the list before updating the list
    if (decodedUser.id !== list.userId) {
      throw new ForbiddenException(
        'Unauthorized Activity',
      );
    }

    // update the list with the provided list id and return
    return await this.prisma.listItem.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteList(id: string, req: Request) {
    // store the user id and email
    const decodedUser: any =
      this.decodedUser(req);

    // the list id to fetch the list information
    const list =
      await this.prisma.listItem.findUnique({
        where: {
          id,
        },
      });

    // validate if the list exist
    if (!list) {
      throw new NotFoundException(
        'List not found',
      );
    }

    // check if the user owns the list before deleting
    if (decodedUser.id !== list.userId) {
      throw new ForbiddenException(
        'Unauthorized Activity',
      );
    }

    // delete the list item
    await this.prisma.listItem.delete({
      where: {
        id: list.id,
      },
    });
    return {
      message: `List with ID: #${id} deleted`,
    };
  }

  // generate user id and email
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
