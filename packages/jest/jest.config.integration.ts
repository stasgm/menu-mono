import { testRoot, singleIntTestMatch } from './constants';
import { baseConfig } from './jest.config';

const integrationConfig = {
  ...baseConfig,
  testMatch: [`${testRoot}/**/${singleIntTestMatch}`],
  maxWorkers: 1,
};

export default integrationConfig;
