import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../users/users.repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  findAll(params: { skip?: number; take?: number }) {
    const { skip = 0, take = 100 } = params;
    return this.usersRepository.getUsers({ skip, take });
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

  // async create(createUserInput: CreateUserInput, createCustomerInput: CreateCustomerInput) {
  async create(createUserInput: CreateUserInput) {
    // const existingCustomer = await this.customersService.findByPhoneNumber(
    //   createUserInput.phoneNumber
    // );

    // const customer =
    //   existingCustomer ??
    //   (await this.customersService.create({
    //     email: createUserInput.email,
    //     firstName: createUserInput.firstName,
    //     lastName: createUserInput.lastName,
    //     phoneNumber: createUserInput.phoneNumber,
    //   }));

    return this.usersRepository.createUser({
      data: createUserInput,
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
