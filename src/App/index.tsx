import Routes from './Routes';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import environment from '../config/environment';

const client = new ApolloClient({
  uri: environment.graphqlEndpoint,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
  
}

export default App;
