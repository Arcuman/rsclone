import { User } from '@/resources/users/user.model';

export interface AuthUser {
  user: User;
  token: string;
}
