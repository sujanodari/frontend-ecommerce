import { authenticatedUserVar } from '../reactiveVariables';

export const fieldPolicy = {
  AuthenticatedUser: {
    read() {
      return authenticatedUserVar();
    },
  },
};
