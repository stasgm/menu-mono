import { Injectable } from '@nestjs/common';

import { CreateCustomerInput, CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository
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

  async create(createCustomerInput: CreateCustomerInput, createUserInput: CreateUserInput) {
    const customer = await this.customersRepository.createCustomer({ data: createCustomerInput });
    return this.usersRepository.createUser({
      data: { ...createUserInput, customerId: customer.id },
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
