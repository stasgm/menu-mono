import { gql } from 'apollo-server-express';
import request from 'supertest';

// import { GQL } from '../../helpers/constants';

import { E2EApp, initializeApp } from '../../helpers/initialize-app';

describe('User registration', () => {
  // For the debug mode timeout set to 5 minutes
  if (process.env.VSCODE_INSPECTOR_OPTIONS) {
    jest.setTimeout(60 * 1000 * 5);
  }

  let e2e: E2EApp;

  beforeEach(async () => {
    e2e = await initializeApp();
    await e2e.cleanup();
  });

  const query = gql`
    mutation RegisterUser($registerUserInput: RegisterUserInput!) {
      registerUser(registerUserInput: $registerUserInput) {
        active
        confirmed
        name
        role
        customer {
          email
          firstName
          lastName
          phoneNumber
        }
      }
    }
  `.loc?.source.body;

  it('should register a new user and then return user data', async () => {
    const registerUserInput = {
      name: 'Stasnislau',
      password: '1234',
      customer: {
        email: 'stasgm@gmail.com',
        lastName: 'Stanislau',
        firstName: 'Shl',
        phoneNumber: '+11122а23231',
      },
    };
    const gqlReq = {
      query,
      variables: {
        registerUserInput: registerUserInput,
      },
    };

    const result = await request(e2e.app.getHttpServer()).post('/graphql').send(gqlReq).expect(200);
    const data = result.body.data?.registerUser;

    expect(result.body.error).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.name).toBe(registerUserInput.name);
    expect(data.active).toBe('true');
    expect(data.confirmed).toBe('false');
    expect(data.role).toBe('USER');
    expect(data.customer.email).toBe(registerUserInput.customer.email);
    expect(data.customer.firstName).toBe(registerUserInput.customer.firstName);
    expect(data.customer.lastName).toBe(registerUserInput.customer.lastName);
    expect(data.customer.phoneNumber).toBe(registerUserInput.customer.phoneNumber);

    // TODO: get activationCode from email or db
  });
});
