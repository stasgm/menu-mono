import { IAppConfig } from '../src/core/config/types';

const config: IAppConfig = {
  envPrefix: 'test',
  nestPort: 3000,
  postgres: {
    dbname: 'testdb',
    host: 'localhost',
    port: 5434,
    user: 'test_user',
    password: '1234',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

export default config;
