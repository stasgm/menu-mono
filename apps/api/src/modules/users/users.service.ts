import { Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.createUser({ data: createUserInput });
  }

  findAll() {
    return this.usersRepository.getUsers({});
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.usersRepository.getUser({ where: { phoneNumber } });
  }

  async findByPhoneNumberOrCreate(name: string, phoneNumber: string) {
    const existingUser = await this.usersRepository.getUser({
      where: { phoneNumber },
    });

    if (existingUser) {
      return existingUser;
    }

    return this.usersRepository.createUser({
      data: {
        name,
        phoneNumber,
      },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.updateUser({
      where: {
        id,
      },
      data: updateUserInput,
    });
  }

  remove(id: string) {
    return this.usersRepository.deleteUser({ where: { id } });
  }
}
