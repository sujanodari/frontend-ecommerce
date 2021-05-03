import Cookies from 'js-cookie';

import { ICookieArgs, ICookieDeleteArgs } from '../interfaces/ICookie';

export const setCookie = (args: ICookieArgs): void => {
  Cookies.set(args.name, args.value, args.options || {});
};

export const getCookie = (name: string): string | null => {
  const cookie: string | undefined = Cookies.get(name);
  if (!cookie) {
    return null;
  }

  return cookie;
};

export const removeCookie = (args: ICookieDeleteArgs): void => {
  Cookies.remove(args.name, args.options);
};
