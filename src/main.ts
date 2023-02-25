import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // create session
  app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 20000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  await app.listen(
    process.env.PORT
      ? parseInt(process.env.PORT)
      : 3000,
  );
}
bootstrap();
