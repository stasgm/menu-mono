import type { AppProps } from 'next/app';
import React from 'react';
// import { Provider } from 'react-redux';
// import store from '@/store/redux';

import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
    // </Provider>
  );
}

export default MyApp;
