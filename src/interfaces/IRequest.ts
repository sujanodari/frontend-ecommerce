import { CredentialsEnum } from '../enum/requestEnum';

export interface IFetchService {
  url: string;
  method: string;
  credentials?: CredentialsEnum | undefined;
  headers?: Headers | string[][];
  body?: any;
}

export interface IRequestOptions {
  credentials?: string;
  headers?: any;
}

export interface IGetArgs {
  endpoint: string;
  headers?: any;
  credentials?: string;
}

export interface IPostArgs {
  endpoint: string;
  data: any;
  headers?: any;
  credentials?: string;
  needToken?: boolean;
}

export interface IHttpService<T> {
  get(args: any): T;
  post(args: IPostArgs): T;
  put(args: any): T;
  delete(args: any): T;
}
