import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string, req: Request) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const decodedUser = req.user as {
      id: string;
      email: string;
    };

    if (user.id !== decodedUser.id) {
      throw new ForbiddenException(
        'Incorrect user id',
      );
    }

    delete user.password;
    return { user };
  }

  async getAllUsers() {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        list: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Users not found',
      );
    }
    return { user };
  }

  async deleteUser(id: string) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return `User with ID: #${id} deleted`;
  }
}
