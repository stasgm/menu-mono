import { Test, TestingModule } from '@nestjs/testing';

import { ActivationCodesResolver } from './activation-codes.resolver';
import { ActivationCodesService } from './activation-codes.service';

describe('ActivationCodesResolver', () => {
  let resolver: ActivationCodesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivationCodesResolver, ActivationCodesService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();
    resolver = module.get<ActivationCodesResolver>(ActivationCodesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
