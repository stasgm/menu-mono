import './globals.css';

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { __DEV__ } from '@apollo/client/utilities/globals';
import type { Metadata } from 'next';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

import { ApolloWrapper } from '../lib/apolloProvider';
import NavBar from './components/NavBar';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog for testing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <NavBar />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
