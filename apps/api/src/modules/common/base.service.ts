import { Logger, Type } from '@nestjs/common';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, EntityOptions, IBaseRepository, IBaseService, UpdateInput } from './base.types';

export const BaseService = <T extends BaseEntity, C extends BaseEntity = T>(
  entity: Type<T>,
  _entityWithKeys: Type<C>
) => {
  abstract class BaseServiceHost implements IBaseService<T, C> {
    readonly logger: Logger = new Logger(entity.name);
    protected constructor(readonly repository: IBaseRepository<T, C>) {}

    findAll(params: FindAllBaseArgs) {
      this.logger.debug(`Operation: findAll`);
      // TODO find another way to make default values on services
      const { skip = 0, take = 100, ...rest } = params;
      return this.repository.findAll({ skip, take, ...rest });
    }

    findOne(id: string, options?: EntityOptions) {
      this.logger.debug(`Operation: findOne (id: ${id})`);
      return this.repository.findOne(id, options);
    }

    create(data: CreateInput<C>) {
      this.logger.debug('Operation: create', JSON.stringify(data, null, 2));
      return this.repository.create(data);
    }

    update(id: string, data: UpdateInput<C>) {
      this.logger.debug(`Operation: update (id: ${id})`, JSON.stringify(data, null, 2));
      return this.repository.update(id, data);
    }

    remove(id: string) {
      this.logger.debug(`Operation: remove (id: ${id})`);
      return this.repository.remove(id);
    }
  }

  return BaseServiceHost;
};
