import { IAppConfig } from '@/core/config/types';

const config: IAppConfig = {
  envPrefix: 'development',
  nestPort: 3000,
  postgres: {
    dbname: 'devdb',
    host: 'localhost',
    port: 5433,
    user: 'dev_user',
    password: '1234',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

export default config;
