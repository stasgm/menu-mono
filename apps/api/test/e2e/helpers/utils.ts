import request from 'supertest';

import { GQL } from './constants';
import { E2EApp } from './initialize-app';

export const requestFunction = (e2e: E2EApp, gqlReq: Record<string, unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  request(e2e.app.getHttpServer()).post(GQL).send(gqlReq).expect(200);
