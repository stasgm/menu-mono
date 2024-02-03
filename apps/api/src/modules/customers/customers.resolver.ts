import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CustomersService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './models/customer.model';

@Resolver(() => Customer)
export class CustomersResolver extends BaseResolver(Customer, CreateCustomerInput, UpdateCustomerInput) {
  constructor(readonly customersService: CustomersService) {
    super(customersService);
  }
}
