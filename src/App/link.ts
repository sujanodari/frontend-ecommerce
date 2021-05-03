import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import environment from '../config/environment';
import { authenticatedUserVar } from '../reactiveVariables';
import { renewAccessToken } from '../services/api/tokenService';

export const httpLink = createHttpLink({
  uri: environment.graphqlEndpoint,
  credentials: 'include',
});

export const authLink = setContext((_: any, { headers }) => {
  const authenticatedUser = authenticatedUserVar();
  const accessToken = authenticatedUser?.accessToken;

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

export const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const authenticatedUser = authenticatedUserVar();
    const accessToken = authenticatedUser?.accessToken;
    if (!accessToken) {
      return true;
    }

    try {
      const decoded: any = jwtDecode(accessToken);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  },
  fetchAccessToken: () => {
    return renewAccessToken();
  },
  handleFetch: (accessToken) => {
    const authenticatedUser = authenticatedUserVar();
    authenticatedUserVar({
      ...authenticatedUser,
      accessToken,
    });
  },
  handleError: (err) => {
    const authenticatedUser = authenticatedUserVar();
    authenticatedUserVar({
      ...authenticatedUser,
      isLoggedIn: false,
    });
  },
});
