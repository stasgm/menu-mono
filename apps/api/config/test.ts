import { IAppConfig } from '@/core/config/types';

const config: IAppConfig = {
  envPrefix: 'test',
  nestPort: 3000,
  postgres: {
    dbname: 'menu-mono-test',
    host: 'localhost',
    port: 5433,
    user: 'test_user',
    password: '1234',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  mail: {
    mockMailing: true,
  }
};

export default config;
