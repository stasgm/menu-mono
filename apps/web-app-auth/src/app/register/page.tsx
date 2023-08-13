import React from 'react';
import { ApolloWrapper } from '@/lib/apolloProvider';
import RegisterUser from './RegisterUser';

export default function Register() {
  return (
    <ApolloWrapper>
      <RegisterUser />
    </ApolloWrapper>
  );
}
