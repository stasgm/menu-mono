import { HttpStatus } from '@nestjs/common';
import { Roles } from '@packages/domains';

import { AppErrors } from '../../../src/core/constants/errors';
import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { userData, userPassword } from '../helpers/mock-data';
import { loginUserQuery } from '../helpers/queries';
import { createUser, requestFunction, updateUser } from '../helpers/utils';

describe('Refrsh activation code', () => {
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

  const getGqlReq = (data: typeof loginUserInput = loginUserInput) => {
    return {
      query: loginUserQuery,
      variables: {
        loginUserInput: data,
      },
    };
  };

  it('should successfully get current user', async () => {
    // 1. Create a new user
    await createUser(e2e, { active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, getGqlReq());
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.user.name).toBe(userData.name);
    expect(dataLogin.user.role).toBe(Roles.USER);
    expect(dataLogin.accessToken).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Get current user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.accessToken as string);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(data.user.name).toBeDefined();
    expect(data.user.name).toBe(userData.name);
    expect(data.user.role).toBe(Roles.USER);
  });
});
