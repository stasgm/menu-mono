import { testRoot, singleIntTestMatch, singleUnitTestMatch } from './constants';
import { baseConfig } from './jest.config';

const unitConfig = {
  ...baseConfig,
  testMatch: [`${testRoot}/**/${singleUnitTestMatch}`, `${testRoot}/**/${singleIntTestMatch}`],
};

export default unitConfig;
