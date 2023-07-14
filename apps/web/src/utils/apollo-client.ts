import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const veryLonFunctionName = (params: { param1: string; param2: string; param3: string }) => {};

export default client;
