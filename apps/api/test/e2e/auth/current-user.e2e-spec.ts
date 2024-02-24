import { HttpStatus } from '@nestjs/common';
import { Roles } from '@packages/domains';

import { AppErrors } from '@/core/constants/errors';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { userData, userPassword } from '../helpers/mock-data';
import { currentUserQuery, loginUserQuery } from '../helpers/queries';
import { createUser, requestFunction, updateUser } from '../helpers/utils';

describe('Current user', () => {
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
    query: currentUserQuery,
  };

  it('should successfully return current user', async () => {
    // 1. Create a new activated user
    await createUser(e2e, { active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.user.name).toBe(userData.name);
    expect(dataLogin.user.role).toBe(Roles.USER);
    expect(dataLogin.accessToken).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Get current user
    const result = await requestFunction(e2e, gqlReq, dataLogin.accessToken as string);
    const data = result.body.data?.getCurrentUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.id).toBeDefined();
    expect(data.name).toBe(userData.name);
    expect(data.role).toBe(Roles.USER);
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new activated user
    const user = await createUser(e2e, { active: true });
    // 2. Receive the access token from the login request
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.accessToken).toBeDefined();
    // 3. Disable the user manually
    await updateUser(e2e, user.id, { disabled: true });
    // 4. Try to get current user
    const result = await requestFunction(e2e, gqlReq, dataLogin.accessToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
