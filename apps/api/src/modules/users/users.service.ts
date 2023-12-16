import { Injectable } from '@nestjs/common';

import { CreateCustomerInput, CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { CustomersService } from '../customers/customers.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private customersService: CustomersService
  ) {}

  findAll(params: { skip?: number; take?: number }) {
    return this.usersRepository.getUsers(params);
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  findByName(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }

  findForAuth(name: string) {
    return this.usersRepository.getUser({ where: { name } });
  }

  async create(createUserInput: CreateUserInput, createCustomerInput: CreateCustomerInput) {
    // const existingCustomer = await this.customersService.findByPhoneNumber(createCustomerInput.phoneNumber);

    // const customer = existingCustomer ?? await this.customersService.create(createCustomerInput);

    return this.usersRepository.createUser({
      data: {
        ...createUserInput,
        ...createCustomerInput,
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
