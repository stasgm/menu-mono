import './globals.css';

import { initProductState } from '@lib/products-store';
import { Provider, StoreContext, useCreateStore } from '@lib/zustand-provider';
import { AppProps } from 'next/app';

import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  // const createStore_old = useCreateStore(pageProps.initialZustandState);

  const createStore = initProductState();
  return (
    <Provider value={createStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
