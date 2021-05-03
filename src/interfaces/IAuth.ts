import { IAuthUserDetail } from './IUser';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthenticatedUser {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: IAuthUserDetail;
}
