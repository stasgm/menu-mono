import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '@/core/constants/errors';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { activationCode, userData, userPassword } from '../helpers/mock-data';
import { loginUserQuery, refreshTokensQuery } from '../helpers/queries';
import { createUser, requestFunction, updateUser } from '../helpers/utils';

describe('Refrsh tokens', () => {
  // For the debug mode timeout set to 5 minutes
  if (process.env.VSCODE_INSPECTOR_OPTIONS) {
    jest.setTimeout(60 * 1000 * 5);
  }

  let e2e: E2EApp;

  beforeAll(async () => {
    e2e = await initializeApp();
  });

  afterAll(async () => {
    await e2e.close();
  });

  beforeEach(async () => {
    await e2e.cleanup();
  });

  const loginUserInput = {
    name: userData.name,
    password: userPassword,
  };

  const gqlReqLogin = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  const gqlReq = {
    query: refreshTokensQuery,
  };

  it('should successfully refresh tokens', async () => {
    // 1. Create a new user
    await createUser(e2e, { active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Refresh tokens
    const result = await requestFunction(e2e, gqlReq, dataLogin.refreshToken as string);
    const data = result.body.data?.refreshTokens;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new user
    const user = await createUser(e2e, { active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Disable the user manually
    await updateUser(e2e, user.id, { disabled: true });
    // 4. Try to get refresh activation code
    const result = await requestFunction(e2e, gqlReq, dataLogin.refreshToken as string);
    const data = result.body.data?.refreshActivationCode;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
