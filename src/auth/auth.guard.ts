import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.url.includes('auth')) {
      return true;
    }

    try {
      const b64Token = request.headers.authorization?.replace('Bearer ', '');
      const JSONToken = Buffer.from(b64Token, 'base64').toString();
      const token = JSON.parse(JSONToken);

      if (!token.id || !token.email) {
        return Promise.reject();
      }
    } catch (e) {
      throw new HttpException(
        'Не удалось распарсить токен',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
