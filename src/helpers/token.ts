import { getCookie } from '../helpers/cookie';
import environment from '../config/environment';

export const getAccessToken = () => {
  let token: string | null = getCookie(environment.accessTokenName);
  return token;
};
