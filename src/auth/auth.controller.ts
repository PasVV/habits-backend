import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserCredentials } from './types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: UserCredentials): Promise<string | unknown> {
    return this.authService.login(credentials).catch((e) => {
      return new HttpException(
        {
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
