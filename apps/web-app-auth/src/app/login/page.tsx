import React from 'react';
import { ApolloWrapper } from '@/lib/apolloProvider';
import LoginUser from './LoginUser';

export default function Register() {
  return (
    <ApolloWrapper>
      <LoginUser />
    </ApolloWrapper>
  );
}
