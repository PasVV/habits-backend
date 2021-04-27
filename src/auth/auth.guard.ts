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
      parseToken(request);
    } catch (e) {
      throw new HttpException(
        'Не удалось распарсить токен',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}

export function parseToken(request: any) {
  try {
    const b64Token = request.headers.authorization?.replace('Bearer ', '');
    const JSONToken = Buffer.from(b64Token, 'base64').toString();
    const token = JSON.parse(JSONToken);

    if (!token.id || !token.email) {
      return Promise.reject();
    }

    return token;
  } catch (e) {
    throw new Error('Не удалось распарсить токен');
  }
}
