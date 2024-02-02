import { NotFoundException, Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import pluralize from 'pluralize';

import { CreateBaseInput, FindAllBaseArgs, UpdateBaseInput } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, IBaseResolver, IBaseService, UpdateInput } from './base.types';

export const BaseResolver = <T extends BaseEntity, C extends CreateBaseInput, U extends UpdateBaseInput>(
  entity: Type<T>,
  createInputType: C,
  updateInputType: U
): any => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost implements IBaseResolver<T> {
    protected constructor(readonly service: IBaseService<T>) {}

    @Query(() => [entity], {
      name: `findAll${pluralize(entity.name)}`,
      description: `Find all ${pluralize(entity.name.toLowerCase())}`,
    })
    findAll(@Args() args: FindAllBaseArgs) {
      return this.service.findAll(args);
    }

    @Query(() => entity, { name: `findOne${entity.name}`, description: `Find one ${entity.name.toLowerCase()} by id` })
    async findOne(@Args({ name: 'id', type: () => String }) id: string) {
      const result = await this.service.findOne(id);

      if (!result) {
        throw new NotFoundException(`${entity.name} with id '${id}' not found`);
      }

      return result;
    }

    @Mutation(() => entity, { name: `create${entity.name}`, description: `Create ${entity.name.toLowerCase()}` })
    create(@Args({ type: () => createInputType, name: `create${entity.name}Input` }) data: CreateInput<T>) {
      return this.service.create(data);
    }

    @Mutation(() => entity, { name: `update${entity.name}`, description: `Update ${entity.name.toLowerCase()}` })
    async update(
      @Args('id') id: string,
      @Args({ type: () => updateInputType, name: `update${entity.name}Input` }) data: UpdateInput<T>
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
