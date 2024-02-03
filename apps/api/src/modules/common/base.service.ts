import { Logger, Type } from '@nestjs/common';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, IBaseRepository, IBaseService, UpdateInput } from './base.types';

export const BaseService = <T extends BaseEntity>(entity: Type<T>) => {
  abstract class BaseServiceHost implements IBaseService<T> {
    readonly logger: Logger = new Logger(entity.name);
    protected constructor(readonly repository: IBaseRepository<T>) {}

    findAll(params: FindAllBaseArgs) {
      this.logger.debug(`Operation: findAll`);
      return this.repository.findAll(params);
    }

    findOne(id: string) {
      this.logger.debug(`Operation: findOne (id: ${id})`);
      return this.repository.findOne(id);
    }

    create(data: CreateInput<T>) {
      this.logger.debug('Operation: create', JSON.stringify(data, null, 2));
      return this.repository.create(data);
    }

    update(id: string, data: UpdateInput<T>) {
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
