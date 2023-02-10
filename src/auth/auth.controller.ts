import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Dto } from './dto';
import { UserJwtGuard } from './guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: Dto, @Res() res) {
    return this.authService.signup(dto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: Dto, @Res() res) {
    return this.authService.signin(dto, res);
  }

  @UseGuards(UserJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
}
