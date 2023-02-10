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
    // find user with id
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    // validate if the user exist
    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    // store logged user id and email
    const decodedUser = req.user as {
      id: string;
      email: string;
    };

    // check if logged user is request user
    if (user.id !== decodedUser.id) {
      throw new ForbiddenException(
        'Incorrect user id',
      );
    }

    delete user.password;
    return { user };
  }

  async getAllUsers() {
    // find all users
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        list: true,
        role: true,
      },
    });

    // check if user exist
    if (!user) {
      throw new NotFoundException(
        'Users not found',
      );
    }
    return { user };
  }

  async deleteUser(id: string) {
    // get the user by id
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    // check if the user exist
    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    // delete the user
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return `User with ID: #${id} deleted`;
  }
}
