'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';
import { gql, useMutation } from '@apollo/client';
import { toErrorMap } from '@/lib/toErrorMap';

// TODO: Check how to implement codegen accordinly for typechecking

const REGISTER_NEW_USER = gql`
  mutation Register($options: RegisterNewUserInput!) {
    register(options: $options) {
      user {
        uuid
        username
      }
      errors {
        field
        message
      }
    }
  }
`;

export default function RegisterUser() {
  // TODO: Implement uses for data, loading and error
  const [register, { data, loading, error }] = useMutation(REGISTER_NEW_USER);

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        // TODO: Refactor properly and make sure types are catched by LSP
        const response = await register({ variables: { options: values } });

        if (response.data.login.user) {
          console.log(response.data.register.user);
        }

        if (response.data.register.errors) {
          console.log(response.data.register.errors);
          setErrors(toErrorMap(response.data.register.errors));
        }
      }}
    >
      <Form className="flex flex-col">
        <InputField type="email" name="email" label="Email" placeholder="email@email.com" />
        <InputField type="text" name="username" label="Username" />
        <InputField type="password" name="password" label="Password" />
        <FormButton text="Register" />
      </Form>
    </Formik>
  );
}
