import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginReturns, UserCredentials } from './types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body() credentials: UserCredentials,
  ): Promise<LoginReturns | HttpException> {
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
