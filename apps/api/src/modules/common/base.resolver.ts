import { NotFoundException, Type } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import pluralize from 'pluralize';

import { CreateBaseInput, FindAllBaseArgs, UpdateBaseInput } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, IBaseResolver, IBaseService, UpdateInput } from './base.types';

export const BaseResolver = <
  T extends BaseEntity,
  C extends BaseEntity,
  U extends CreateBaseInput,
  V extends UpdateBaseInput
>(
  entity: Type<T>,
  _entityWithKeys: Type<C>,
  createBaseInput: U,
  updateOrderInput: V
): any => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost implements IBaseResolver<T, C> {
    protected constructor(readonly service: IBaseService<T, C>) {}

    @Query(() => [entity], {
      name: `findAll${pluralize(entity.name)}`,
      description: `Find all ${pluralize(entity.name.toLowerCase())}`,
    })
    findAll(@Args() args: FindAllBaseArgs) {
      return this.service.findAll(args);
    }

    @Query(() => entity, { name: `findOne${entity.name}`, description: `Find one ${entity.name.toLowerCase()} by id` })
    async findOne(@Args({ name: 'id', type: () => ID }) id: string) {
      const result = await this.service.findOne(id);

      if (!result) {
        throw new NotFoundException(`${entity.name} with id '${id}' not found`);
      }

      return result;
    }

    @Mutation(() => entity, { name: `create${entity.name}`, description: `Create ${entity.name.toLowerCase()}` })
    create(@Args({ type: () => createBaseInput, name: `create${entity.name}Input` }) data: CreateInput<C>) {
      return this.service.create(data);
    }

    @Mutation(() => entity, { name: `update${entity.name}`, description: `Update ${entity.name.toLowerCase()}` })
    async update(
      @Args('id') id: string,
      @Args({ type: () => updateOrderInput, name: `update${entity.name}Input` }) data: UpdateInput<C>
    ) {
      const result = await this.service.update(id, data);

      if (!result) {
        throw new NotFoundException(`${entity.name} with id '${id}' not found`);
      }

      return result;
    }

    @Mutation(() => entity, { name: `remove${entity.name}`, description: `Remove ${entity.name.toLowerCase()}` })
    remove(@Args('id') id: string) {
      const result = this.service.remove(id);

      if (!result) {
        throw new NotFoundException(`${entity.name} with id '${id}' not found`);
      }

      return result;
    }
  }

  return BaseResolverHost;
};
