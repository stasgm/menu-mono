import { Args, Query, Resolver } from '@nestjs/graphql';

import { CreateBaseDTO, FindAllBaseDTO, UpdateBaseDTO } from './base.dto';
import { BaseEntity } from './base.entity';
// import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { Constructor } from './base.types';

export const BaseResolver = <T extends BaseEntity, C, U, F extends FindAllBaseDTO>(
  className: Constructor<T>,
  EntityFindAllDTOClass: F,
  EntityCreateDTOClass: C,
  EntityUpdateDTOClass: U
) => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected constructor(readonly service: BaseService<T>) {}

    @Query(() => [className], { name: `findAll${className.name}` })
    findAll(@Args() args: FindAllBaseDTO): Promise<T[]> {
      return this.service.findAll(args);
    }

    @Query(() => className, { name: `findOne${className.name}`, description: 'Find by id' })
    findOne(@Args('id', { type: () => String }) id: string): Promise<T | null> {
      return this.service.findOne(id);
    }
  }

  return BaseResolverHost;
};
