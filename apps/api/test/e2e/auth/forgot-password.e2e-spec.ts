import { ForgotPasswordInput } from '@/modules/auth/dto/inputs';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { customerData } from '../helpers/mock-data';
import { forgotPasswordQuery, requestFunction } from '../helpers/queries';

describe('Forgot password', () => {
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

  const forgotPasswordInput: ForgotPasswordInput = {
    email: customerData.email,
  };

  const getGqlReq = (data: ForgotPasswordInput = forgotPasswordInput) => ({
    query: forgotPasswordQuery,
    variables: {
      forgotPasswordInput: data,
    },
  });

  it('should successfully call the ForgotPassword mutation', async () => {
    await e2e.prismaUtilsService.createUser({ active: true });

    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();
  });

  it("should successfully call the ForgotPassword mutation (the user email doen't exist)", async () => {
    await e2e.prismaUtilsService.createUser({ active: true });

    const result = await requestFunction(e2e, getGqlReq({ ...forgotPasswordInput, email: 'wrong@email.com' }));
    const data = result.body.data?.forgotPassword;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.message).toBeDefined();
  });
});
