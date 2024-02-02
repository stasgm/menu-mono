import { Injectable } from '@nestjs/common';

import { BaseService } from '../common/base.service';
import { UsersRepository } from '../users/users.repository';
import { User } from './models/user.model';

@Injectable()
export class UsersService extends BaseService(User) {
  constructor(readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  findByName(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }

  findForAuth(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }
}
