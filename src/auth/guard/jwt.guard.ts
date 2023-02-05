import { Injectable, 
    CanActivate, 
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { decode } from 'punycode';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserJwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}

export class AdminJwtGuard 
// extends AuthGuard('jwt') 
implements CanActivate {
    constructor(private prisma: PrismaService) {
        // super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const [req] = context.getArgs();
        const token = req.cookies.token
        console.log(token)
        console.log(req)
        const user = await this.prisma.user.findUnique({
          where: { id: req.user.id },
          select: { isAdmin: true },
        });
    
        if (!user.isAdmin) {
          throw new ForbiddenException('Unauthorized access');
        }
    
        return true;
    }
}