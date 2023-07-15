import '@/styles/global.css';

// import { Provider } from 'react-redux';
// import store from '@/store/redux';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React from 'react';

import client from '../utils/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.StrictMode>
    // </Provider>
  );
}

export default MyApp;
