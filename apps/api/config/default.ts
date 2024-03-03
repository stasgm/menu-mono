import { IAppConfig } from '@/core/config/types';

const config: IAppConfig = {
  envPrefix: 'default',
  nestPort: 3000,
  secuirity: {
    strategies: ['JWT', 'LOCAL'],
    jwt: {
      access: {
        expiresIn: '15m',
      },
      refresh: {
        expiresIn: '7d',
      },
      activate: {
        expiresIn: '1d',
      },
      resetPass: {
        expiresIn: '1h',
      },
    },
  },
};

export default config;
