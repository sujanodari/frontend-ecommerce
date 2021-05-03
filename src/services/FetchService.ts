import { IFetchService } from '../interfaces/IRequest';

export default class FetchService {
  request(args: IFetchService): Promise<Response> {
    const { url, ...options } = args;
    return fetch(url, options);
  }
}
