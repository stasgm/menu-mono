import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { User, UserWithKeys } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService(User, UserWithKeys) {
  constructor(protected readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  findByName(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }

  findForAuth(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }
}
