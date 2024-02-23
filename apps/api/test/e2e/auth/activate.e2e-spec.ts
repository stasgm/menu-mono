// import { HttpStatus } from '@nestjs/common';
// import { AppErrors } from '../../../src/core/constants/errors';
import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { requestFunction } from '../helpers/utils';
import { activationCode, newUserData, userPassword } from './mock-data';
import { activateUserQuery, loginUserQuery } from './queries';

describe('User activation', () => {
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

  const activateUserInput = {
    activationCode,
  };

  const gqlReq = {
    query: activateUserQuery,
    variables: {
      activateUserInput,
    },
  };

  const loginUserInput = {
    name: newUserData.name,
    password: userPassword,
  };

  const gqlReqLogin = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  it('should activate new user', async () => {
    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);

    const user = await e2e.prisma.user.create({ data: { ...newUserData, passwordHash } });

    // 2. Create an activation code
    await e2e.prisma.activationCode.create({
      data: {
        code: activationCode,
        userId: user.id,
      },
    });

    // 4. Get activationToken from Login
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;
    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).not.toBeUndefined();
    expect(dataLogin.activationToken).toBeDefined();

    // 3. Activate user
    const result = await requestFunction(e2e, gqlReq, dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user.name).toBe(newUserData.name);
    expect(data.user.role).toBe(newUserData.role);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();

    const activationCodeEntity = await e2e.prisma.activationCode.findFirst({
      where: {
        userId: user.id,
      },
    });

    expect(activationCodeEntity).toBeNull();
  });

  it('should throw an error (invalid activation code)', async () => {

  });
});
