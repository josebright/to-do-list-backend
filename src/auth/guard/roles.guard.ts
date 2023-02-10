import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return false;
    }
    const req = context
      .switchToHttp()
      .getRequest();

    // Get token from request and extract user id from the token
    const decoded: object = jwt_decode(
      req.cookies.token,
    );
    const decodedUser = decoded as {
      id: string;
      email: string;
    };

    // If user exist, then get user's role
    if (decodedUser) {
      const user =
        await this.prisma.user.findUnique({
          where: { id: decodedUser.id },
        });

      return roles.some((role) => {
        return role === user.role;
      });
    }
  }
}
