import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserCredentials } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(credentials: UserCredentials): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.login },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user || user.password !== credentials.password) {
      throw new Error('Неверный логин или пароль.');
    }

    const { id, email } = user;

    return Buffer.from(JSON.stringify({ id, email })).toString('base64');
  }
}
