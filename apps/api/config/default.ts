import { IAppConfig } from '@/core/config/types';

const config: IAppConfig = {
  envPrefix: 'default',
  nestPort: 3000,
  secuirity: {
    strategies: ['JWT', 'LOCAL'],
    jwt: {
      accessExpiresIn: '15m',
      refreshExpiresIn: '7d',
    }
  }
};

export default config;
