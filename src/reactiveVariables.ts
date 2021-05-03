import { makeVar } from '@apollo/client';

import { IAuthenticatedUser } from './interfaces/IAuth';

const authenticatedUser: IAuthenticatedUser = {
  accessToken: null,
  isLoggedIn: false,
  user: {
    _id: null,
    role: null,
  },
};

export const authenticatedUserVar = makeVar<IAuthenticatedUser>(authenticatedUser);
