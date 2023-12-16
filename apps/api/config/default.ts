import { IAppConfig } from '../src/core/config/types';

const config: IAppConfig = {
  envPrefix: 'default',
  nestPort: 3000,
  secuirity: {
    strategies: ['JWT', 'LOCAL']
  }
};

export default config;
