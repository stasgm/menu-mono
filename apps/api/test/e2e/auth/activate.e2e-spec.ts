import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '@/core/constants/errors';

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

  const getGqlReq = (data: typeof activateUserInput = activateUserInput) => {
    return {
      query: activateUserQuery,
      variables: {
        activateUserInput: data,
      },
    };
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
    const user = await createUser(e2e, {}, activationCode);
    // 2. Get activationToken from Login
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;
    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Activate user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.user.name).toBe(userData.name);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
    // 3. Activate user
    const activationCodeEntity = await e2e.prisma.activationCode.findFirst({
      where: {
        userId: user.id,
      },
    });

    expect(activationCodeEntity).toBeNull();
  });

  it('should throw an error (invalid activation code and attempts exceeded - after 3 failed attempts)', async () => {
    // 1. Create a new user
    const user = await createUser(e2e, {}, activationCode);
    // 2. Get activationToken from Login
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;
    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Try to activate a user
    const invalidActivationCode = 'invalid-activation-code';
    // Attempt 1
    const result1 = await requestFunction(
      e2e,
      getGqlReq({ activationCode: invalidActivationCode }),
      dataLogin.activationToken as string
    );
    const data1 = result1.body.data?.activateUser;
    const errors1 = result1.body.errors;

    expect(data1).toBeUndefined();
    expect(errors1).toBeDefined();
    expect(errors1).toBeInstanceOf(Array);
    expect(errors1.length).toBe(1);
    expect(errors1[0].code).toBe(AppErrors.INVALID_ACTIVATION_CODE);
    expect(errors1[0].statusCode).toBe(HttpStatus.BAD_REQUEST);
    // Attempt 2
    const result2 = await requestFunction(
      e2e,
      getGqlReq({ activationCode: invalidActivationCode }),
      dataLogin.activationToken as string
    );
    const data2 = result2.body.data?.activateUser;
    const errors2 = result2.body.errors;

    expect(data2).toBeUndefined();
    expect(errors2).toBeDefined();
    expect(errors2).toBeInstanceOf(Array);
    expect(errors2.length).toBe(1);
    expect(errors2[0].code).toBe(AppErrors.INVALID_ACTIVATION_CODE_ATTEMPTS_EXCEEDED);
    expect(errors2[0].statusCode).toBe(HttpStatus.BAD_REQUEST);
    // // Attempt 3
    // const result3 = await requestFunction(
    //   e2e,
    //   getGqlReq({ activationCode: invalidActivationCode }),
    //   dataLogin.activationToken as string
    // );
    // const data3 = result3.body.data?.activateUser;
    // const errors3 = result3.body.errors;

    // expect(data3).toBeUndefined();
    // expect(errors3).toBeDefined();
    // expect(errors3).toBeInstanceOf(Array);
    // expect(errors3.length).toBe(1);
    // expect(errors3[0].code).toBe(AppErrors.INVALID_ACTIVATION_CODE);
    // expect(errors3[0].statusCode).toBe(HttpStatus.BAD_REQUEST);
    // // Attempt 4
    // const result3 = await requestFunction(
    //   e2e,
    //   getGqlReq({ activationCode: invalidActivationCode }),
    //   dataLogin.activationToken as string
    // );
    // const data4 = result3.body.data?.activateUser;
    // const errors4 = result3.body.errors;
    // expect(data4).toBeUndefined();
    // expect(errors4).toBeDefined();
    // expect(errors4).toBeInstanceOf(Array);
    // expect(errors4.length).toBe(1);
    // expect(errors3[0].code).toBe(AppErrors.INVALID_ACTIVATION_CODE_ATTEMPTS_EXCEEDED);
    // expect(errors3[0].statusCode).toBe(HttpStatus.FORBIDDEN);

    const activationCodeEntity = await e2e.prisma.activationCode.findFirst({ where: { userId: user.id } });
    expect(activationCodeEntity).toBeDefined();
    expect(activationCodeEntity?.attempts).toBe(0);
    // A new code should be generated
    expect(activationCodeEntity?.code).not.toBe(activationCode);
  });

  it('should throw an error (user already activated)', async () => {
    // expect(errors1[0].code).toBe(AppErrors.USER_ALREADY_ACTIVATED);
    // expect(errors1[0].statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
