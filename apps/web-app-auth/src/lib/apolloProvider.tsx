'use client';

import { ApolloClient, ApolloLink, HttpLink, SuspenseCache } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

// NOTE: Check about HttpLink and ApolloClient credentials

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:21010/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    credentials: 'include',
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// function makeSuspenseCache() {
//   return new SuspenseCache();
// }

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
  // return <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>{children}</ApolloNextAppProvider>;
}
