import request from 'supertest';
import { App } from 'supertest/types';

import { GQL } from './constants';
import { E2EApp } from './initialize-app';
import { CreateUserData, getUserData, userPassword } from './mock-data';

export const requestFunction = (e2e: E2EApp, gqlReq: Record<string, unknown>, token: string = '') =>
  request(e2e.app.getHttpServer() as App)
    .post(GQL)
    .set('Authorization', `JWT ${token}`)
    .send(gqlReq)
    .expect(200);

export const createUser = async (
  e2e: E2EApp,
  createUserData: Omit<CreateUserData, 'passwordHash'> & { password?: string } = {},
  activationCode?: string
) => {
  const { password = userPassword, ...userData } = createUserData;
  const passwordHash = await e2e.passwordService.hashPassword(password);

  const user = await e2e.prisma.user.create({ data: getUserData({ passwordHash, ...userData }) });

  if (activationCode) {
    // 2. Create an activation code
    await e2e.prisma.activationCode.create({
      data: {
        code: activationCode,
        userId: user.id,
      },
    });
  }

  return user;
};

export const updateUser = async (
  e2e: E2EApp,
  userId: string,
  userData: Partial<Omit<CreateUserData, 'passwordHash'>> & { deletedAt?: Date } = {}
) => {
  return await e2e.prisma.user.update({ data: userData, where: { id: userId } });
};
