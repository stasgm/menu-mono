import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '@/core/constants/errors';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { activationCode, userData, userPassword } from '../helpers/mock-data';
import { activateUserQuery, loginUserQuery, requestFunction } from '../helpers/queries';

describe('User activation', () => {
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

  const getGqlReq = (data: typeof activateUserInput = activateUserInput) => ({
    query: activateUserQuery,
    variables: {
      activateUserInput: data,
    },
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

  it('should successfully activate a new user', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({}, activationCode);
    // 2. Receive the activation token from the login request
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;
    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Activate the user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.user.name).toBe(userData.name);
    expect(data.user.name).toBe(userData.name);
    expect(data.user.active).toBeTruthy();
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
    // 3. Check activation code
    const activationCodeEntity = await e2e.prismaUtilsService.prismaService.activationCode.findFirst({
      where: {
        userId: data.user.id,
      },
    });

    expect(activationCodeEntity).toBeNull();
  });

  it('should throw an error (user is already activated)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser({});
    // 2. Receive the activation token from the login request
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Activate the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { active: true });
    // 3. Try to activate the user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_ALREADY_ACTIVATED);
    expect(errors[0].statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser();
    // 2. Receive the activation token from the login request
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Disable the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { disabled: true });
    // 4. Try to activate the user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should throw an error (user is deleted)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser();
    // 2. Receive the activation token from the login request
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Sodt delete the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { deletedAt: new Date() });
    // 3. Try to activate the user
    const result = await requestFunction(e2e, getGqlReq(), dataLogin.activationToken as string);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should throw an error (invalid activation code and max attempts exceeded)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser({}, activationCode);
    // Receive the activation token from the login request.
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;
    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.activationToken).toBeDefined();
    // 3. Try to activate the user
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
    // Receive the activationCode record
    const activationCodeEntity = await e2e.prismaUtilsService.prismaService.activationCode.findFirst({
      where: { userId: user.id },
    });
    expect(activationCodeEntity).toBeDefined();
    expect(activationCodeEntity?.attempts).toBe(0);
    // A new code should be generated
    expect(activationCodeEntity?.code).not.toBe(activationCode);
    expect(activationCodeEntity?.sentAt).toBeDefined();
  });
});
