import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserRoles } from '../../user/enums/user.enum';
import { PrismaService } from '../../prisma/prisma.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AdminRoleGuard
  implements CanActivate
{
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest();
    const decoded: object = jwt_decode(
      req.cookies.token,
    );
    const decodedUser = decoded as {
      id: string;
      email: string;
    };
    if (decodedUser) {
      const user =
        await this.prisma.user.findUnique({
          where: { id: decodedUser.id },
        });
      return user.role === UserRoles.ADMIN;
    }

    return false;
  }
}
