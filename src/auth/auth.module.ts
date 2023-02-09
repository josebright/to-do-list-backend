import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './Serializer';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
