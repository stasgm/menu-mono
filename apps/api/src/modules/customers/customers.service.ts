import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { CustomersRepository } from './customers.repository';
import { CreateCustomerInput } from './dto/inputs/create-customer.input';
import { Customer } from './models/customer.model';

@Injectable()
export class CustomersService extends BaseService(Customer, Customer) {
  constructor(private customersRepository: CustomersRepository) {
    super(customersRepository);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    return this.customersRepository.getCustomer({ where: { phoneNumber } });
  }

  findByEmail(email: string) {
    return this.customersRepository.getCustomer({ where: { email } });
  }

  async findByPhoneNumberOrCreate(data: CreateCustomerInput) {
    const existingCustomer = await this.customersRepository.getCustomer({
      where: { phoneNumber: data.phoneNumber },
    });

    if (existingCustomer) {
      return existingCustomer;
    }

    return this.customersRepository.createCustomer({ data });
  }
}
