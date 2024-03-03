import { ResetPasswordInput } from '@/modules/auth/dto/inputs';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { customerData } from '../helpers/mock-data';
import { requestFunction, resetPasswordQuery } from '../helpers/queries';

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

  it('should change the password successfully.', async () => {
    await e2e.prismaUtilsService.createUser({ active: true });

    const resetPassToken = ''; // generate the resetPass token

    const result = await requestFunction(e2e, getGqlReq(), resetPassToken);
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();
  });

  it('should throw an error (the user is not found)', async () => {});
  it('should throw an error (the user is disabled)', async () => {});
  it('should throw an error (the user is deleted)', async () => {});
  // it("should successfully call a ForgotPassword mutation (user email doen't exist)", async () => {
  //   await e2e.prismaUtilsService.createUser({ active: true });

  //   const result = await requestFunction(e2e, getGqlReq({ ...resetPasswordInput, email: 'wrong@email.com' }));
  //   const data = result.body.data?.forgotPassword;
  //   const errors = result.body.errors;

  //   expect(errors).toBeUndefined();
  //   expect(data).toBeDefined();
  //   expect(data.message).toBeDefined();
  // });
});
