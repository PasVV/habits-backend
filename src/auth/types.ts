import { User } from '../user/user.entity';

export type UserCredentials = {
  login: string;
  password: string;
};

export interface LoginReturns {
  token: string;
  user: Exclude<User, 'password'>;
}
