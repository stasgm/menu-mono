import type { AppProps } from 'next/app';
import React from 'react';
// import { Provider } from 'react-redux';
// import store from '@/store/redux';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';

import '@/styles/global.css';

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
