import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private prisma: PrismaService,
  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.prisma.user.findUnique({
        where: { id: payload.id }
    });
    
    return user ? done(null, user) : done(null, null);
  }
}