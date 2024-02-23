import request from 'supertest';

import { GQL } from './constants';
import { E2EApp } from './initialize-app';

export const requestFunction = (e2e: E2EApp, gqlReq: Record<string, unknown>, token: string = '') =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  request(e2e.app.getHttpServer()).post(GQL).set('Authorization', `JWT ${token}`).send(gqlReq).expect(200);
