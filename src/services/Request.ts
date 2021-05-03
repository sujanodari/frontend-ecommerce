import axios, { AxiosInstance, AxiosPromise } from 'axios';

import environment from '../config/environment';
import { IPostArgs, IRequestOptions, IHttpService } from '../interfaces/IRequest';
import { authenticatedUserVar } from '../reactiveVariables';

const apiUrl: string = environment.apiUrl as string;

const instance = axios.create({
  url: apiUrl,
  responseType: 'json',
});

export default class HttpClient<T extends AxiosPromise<any>> implements IHttpService<T> {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: apiUrl,
      responseType: 'json',
      withCredentials: true,
    });
  }

  get(): T {
    throw new Error('not implemented');
  }

  post(args: IPostArgs): T {
    const headers: any = {
      ...args.headers,
    };

    if (args.needToken) {
      const userAuth = authenticatedUserVar();
      const token = userAuth?.accessToken;
      headers['Authorization'] = token ? `Bearer ${token}` : '';
    }

    return this.instance.post(args.endpoint, args.data, {
      headers,
    }) as T;
  }

  put(): T {
    throw new Error('not implemented');
  }

  delete(): T {
    throw new Error('not implemented');
  }
}
