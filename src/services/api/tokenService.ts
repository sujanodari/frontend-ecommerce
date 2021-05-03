import FetchService from '../FetchService';
import { CredentialsEnum } from '../../enum/requestEnum';
import config from '../../config/environment';

const service = new FetchService();

export const renewAccessToken = () => {
  return service.request({
    url: `${config.apiUrl}/token/refresh`,
    method: 'POST',
    credentials: CredentialsEnum.include,
  });
};
