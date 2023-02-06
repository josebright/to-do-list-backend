import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUser (
        id: string, 
        req: Request
    ) {
        const user = await this.prisma.user.findUnique({
            where: { 
                id, 
            },
        });

        if (!user) {
            throw new NotFoundException(
                'User not found'
            );
        }

        const decodedUser = req.user as { id: string, email: string }

        if (user.id !== decodedUser.id) {
            throw new ForbiddenException('Incorrect user id');
        }

        delete user.password;
        return { user };
    }

    async getAllUsers() {
        return await this.prisma.user.findMany(
            {
                select: {
                    id: true,
                    email: true,
                    toDoList: true,
                    history: true,
                    role: true,
                }
            }
        )
    }
}
