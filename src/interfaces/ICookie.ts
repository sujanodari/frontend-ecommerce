export interface ICookieOptions {
  expires: number;
}

export interface ICookieDeleteOptions {
  path: string;
  domain?: string
}

export interface ICookieName {
  name: string;
}

export interface ICookieArgs extends ICookieName {
  value: string;
  options?: ICookieOptions;
}

export interface ICookieDeleteArgs extends ICookieName {
  options?: ICookieOptions;
}

