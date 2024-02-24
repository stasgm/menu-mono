import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { activationCode, userData, userPassword } from '../helpers/mock-data';
import { createUser, requestFunction } from '../helpers/utils';
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
    name: userData.name,
    password: userPassword,
  };

  const gqlReqLogin = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  it('should activate a new user', async () => {
    // 1. Create a new user
    await createUser(e2e, {}, activationCode);
    // 2. Get activationToken from Login
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
    expect(data.user.name).toBe(userData.name);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
    // 3. Activate user
    const activationCodeEntity = await e2e.prisma.activationCode.findFirst({
      where: {
        userId: userData.id,
      },
    });

    expect(activationCodeEntity).toBeNull();
  });

  it('should throw an error (invalid activation code)', async () => {});
});
