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

  findByEmail(email: string) {
    return this.usersRepository.getUser({ where: { customer: { email } } });
  }

  async activate(id: string) {
    // User already verified
    return this.usersRepository.update(id, { active: true });
  }

  async updatePasswordHash(id: string, passwordHash: string) {
    // User already verified
    return this.usersRepository.updatePasswordHash(id, passwordHash);
  }
}
