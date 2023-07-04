import { testRoot, singleUnitTestMatch } from './constants';
import { baseConfig } from './jest.config';

const unitConfig = {
  ...baseConfig,
  testMatch: [`${testRoot}/**/${singleUnitTestMatch}`],
};

export default unitConfig;
