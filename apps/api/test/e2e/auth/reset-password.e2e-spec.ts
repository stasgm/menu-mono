import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '@/core/constants/errors';
import { ForgotPasswordInput, ResetPasswordInput } from '@/modules/auth/dto/inputs';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { customerData, userData } from '../helpers/mock-data';
import { forgotPasswordQuery, loginUserQuery, requestFunction, resetPasswordQuery } from '../helpers/queries';

describe('Reset password', () => {
  let e2e: E2EApp;

  beforeAll(async () => {
    e2e = await initializeApp();
  });

  afterAll(async () => {
    await e2e?.close();
  });

  beforeEach(async () => {
    await e2e?.cleanup();
  });

  const resetPasswordInput: ResetPasswordInput = {
    email: customerData.email,
    password: 'newpassword',
  };

  const getGqlReq = (data: ResetPasswordInput = resetPasswordInput) => ({
    query: resetPasswordQuery,
    variables: {
      resetPasswordInput: data,
    },
  });

  const forgotPasswordInput: ForgotPasswordInput = {
    email: customerData.email,
  };

  const gqlReqForgotPassword = {
    query: forgotPasswordQuery,
    variables: {
      forgotPasswordInput,
    },
  };

  const loginUserInput = {
    name: userData.name,
    password: resetPasswordInput.password,
  };

  const gqlReqLoginUser = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  it('should change the password successfully.', async () => {
    // 1. Create a new activated user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. call the forgot user mutation
    const result = await requestFunction(e2e, gqlReqForgotPassword);
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();

    const resetPassToken = data.message as string;

    // 3. call the reset password mutation
    const result2 = await requestFunction(e2e, getGqlReq(), resetPassToken);
    const data2 = result2.body.data?.resetPassword;
    const errors2 = result2.body.errors;

    expect(errors2).toBeUndefined();
    expect(data2).toBeDefined();
    expect(data2.message).toBeDefined();

    // 4. Trying to login with the new password
    const result3 = await requestFunction(e2e, gqlReqLoginUser);
    const data3 = result3.body.data?.loginUser;
    const errors3 = result3.body.errors;

    expect(errors3).toBeUndefined();
    expect(data3).toBeDefined();
    expect(data3.user).toBeDefined();
    expect(data3.user.name).toBe(userData.name);
    expect(data3.accessToken).toBeDefined();
    expect(data3.refreshToken).toBeDefined();
  });

  it('should throw an error (wrong resetPassToken)', async () => {
    // 1. Create a new activated user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. call the reset password mutation with the wrong resetPassToken
    const result = await requestFunction(e2e, getGqlReq(), 'wrongToken');
    const data = result.body.data?.resetPassword;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.UNAUTHENTICATED);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('should throw an error (the user is disabled)', async () => {
    // 1. Create a new activated user
    const user = await e2e.prismaUtilsService.createUser({ active: true });
    // 2. call the forgot user mutation
    const result = await requestFunction(e2e, gqlReqForgotPassword);
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();

    const resetPassToken = data.message as string;

    // 3. Disable the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { disabled: true });

    // 4. call the reset password mutation
    const result2 = await requestFunction(e2e, getGqlReq(), resetPassToken);
    const data2 = result2.body.data?.resetPassword;
    const errors2 = result2.body.errors;

    expect(data2).toBeUndefined();
    expect(errors2).toBeDefined();
    expect(errors2).toBeInstanceOf(Array);
    expect(errors2.length).toBe(1);
    expect(errors2[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors2[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should throw an error (the user is not deleted)', async () => {
    // 1. Create a new activated user
    const user = await e2e.prismaUtilsService.createUser({ active: true });
    // 2. call the forgot user mutation
    const result = await requestFunction(e2e, gqlReqForgotPassword);
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();

    const resetPassToken = data.message as string;

    // 3. Disable the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { deletedAt: new Date() });

    // 4. call the reset password mutation
    const result2 = await requestFunction(e2e, getGqlReq(), resetPassToken);
    const data2 = result2.body.data?.resetPassword;
    const errors2 = result2.body.errors;

    expect(data2).toBeUndefined();
    expect(errors2).toBeDefined();
    expect(errors2).toBeInstanceOf(Array);
    expect(errors2.length).toBe(1);
    expect(errors2[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors2[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
