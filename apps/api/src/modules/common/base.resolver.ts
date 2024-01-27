import { Args, Query, Resolver } from '@nestjs/graphql';

import { CreateBaseDTO, FindAllBaseDTO, UpdateBaseDTO } from './base.dto';
// import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { Constructor } from './base.types';

export const BaseResolver = <T, C, U>(className: Constructor<T>, EntityCreateDTOClass: C, EntityUpdateDTOClass: U) => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected constructor(readonly service: BaseService<T>) {}

    // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
    @Query(() => [className], { name: `findAll${className.name}` })
    findAll(@Args() args: FindAllBaseDTO): Promise<T[]> {
      const { skip, take } = args;
      return this.service.findAll({ skip, take });
    }
  }

  return BaseResolverHost;
};
