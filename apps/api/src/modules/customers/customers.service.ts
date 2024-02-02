import { Injectable } from '@nestjs/common';

import { CustomersRepository } from './customers.repository';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './models/customer.model';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  // findAll(params: { skip?: number; take?: number }) {
  //   const { skip = 0, take = 100 } = params;
  //   return this.customersRepository.getCustomers({ skip, take });
  // }

  findOne(id: string) {
    return this.customersRepository.getCustomerById(id);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    return this.customersRepository.getCustomer({ where: { phoneNumber } });
  }

  findByEmail(email: string) {
    return this.customersRepository.getCustomer({ where: { email } });
  }

  // create(createCustomerInput: CreateCustomerInput) {
  //   return this.customersRepository.createCustomer({ data: createCustomerInput });
  // }

  async findByPhoneNumberOrCreate(data: CreateCustomerInput) {
    const existingCustomer = await this.customersRepository.getCustomer({
      where: { phoneNumber: data.phoneNumber },
    });

    if (existingCustomer) {
      return existingCustomer;
    }

    return this.customersRepository.createCustomer({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  // update(id: string, updateCustomerInput: UpdateCustomerInput) {
  //   return this.customersRepository.updateCustomer({
  //     where: {
  //       id,
  //     },
  //     data: updateCustomerInput,
  //   });
  // }

  // remove(id: string) {
  //   return this.customersRepository.deleteCustomer({ where: { id } });
  // }
}
