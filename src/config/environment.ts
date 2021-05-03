export default {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/v1',
  accessTokenName: process.env.ACCESS_TOKEN_NAME || 'ecommerceAccessToken',
  graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql',
  refreshTokenCookieName: process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME,
};
