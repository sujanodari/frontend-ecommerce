import { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import cache from '../cache';
import { authenticatedUserVar } from '../reactiveVariables';
import { typeDefs } from '../clientGraphql/typeDefs';
import * as link from './link';
import { renewAccessToken } from '../services/api/tokenService';
import '../assets/sass/main.scss';

const client = new ApolloClient({
  link: ApolloLink.from([link.tokenRefreshLink, link.authLink, link.httpLink]),
  cache,
  typeDefs,
});

function App() {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  useEffect(() => {
    renewAccessToken()
      .then((response) => response.json())
      .then((response) => {
        authenticatedUserVar({
          isLoggedIn: true,
          accessToken: response?.data?.accessToken,
          user: {
            _id: response?.data?._id || null,
            role: response?.data?.role || null,
          },
        });
      })
      .finally(() => {
        setIsAppLoading(false);
      });
  }, []);

  return (
    <StylesProvider injectFirst>
      {isAppLoading ? (
        <Backdrop open={true}>
          <CircularProgress color="inherit" size={80} />
        </Backdrop>
      ) : (
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      )}
    </StylesProvider>
  );
}

export default App;
