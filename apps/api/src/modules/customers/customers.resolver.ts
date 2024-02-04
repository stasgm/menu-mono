import { Resolver } from '@nestjs/graphql';

import { UpdateCategoryInput } from '@/modules/categories/dto/update-category.input';
import { BaseResolver } from '@/modules/common/base.resolver';

import { CustomersService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { Customer } from './models/customer.model';

@Resolver(() => Customer)
export class CustomersResolver extends BaseResolver(Customer, Customer, CreateCustomerInput, UpdateCategoryInput) {
  constructor(readonly customersService: CustomersService) {
    super(customersService);
  }
}
