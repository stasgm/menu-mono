import { IAppConfig } from '@/core/config/types';

const config: IAppConfig = {
  envPrefix: 'development',
  nestPort: 3000,
  postgres: {
    dbname: 'menu-mono',
    host: 'localhost',
    port: 5433,
    user: 'test',
    password: 'test',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

export default config;
