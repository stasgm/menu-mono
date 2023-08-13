'use client';

import { gql, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import React from 'react';

import { toErrorMap } from '@/lib/toErrorMap';

import FormButton from '../components/FormButton';
import InputField from '../components/InputField';

// TODO: Backend communication to login succesfully
// TODO: Buttons for Auth with other platforms

const LOGIN_USER = gql`
  mutation Login($options: LoginInput!) {
    login(options: $options) {
      user {
        uuid
        username
      }
      errors {
        message
        field
      }
    }
  }
`;

export default function LoginUser() {
  // TODO: Implement uses for data, loading and error
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({ variables: { options: values } });

        console.log(response);

        if (response.data.login.user) {
          console.log(response.data.login.user);
        }

        if (response.data.login.errors) {
          console.log(response.data.login.errors);
          setErrors(toErrorMap(response.data.login.errors));
        }
      }}
    >
      <Form className="flex flex-col">
        <InputField type="text" name="username" label="Username" />
        <InputField type="password" name="password" label="Password" />
        <FormButton text="Login" />
      </Form>
    </Formik>
  );
}
