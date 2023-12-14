import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCustomerInput, UpdateCustomerInput } from '../../types/graphql.schema';
import { CustomersService } from './customers.service';

@Resolver('Customer')
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query('customers')
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('take', { type: () => Int, nullable: true }) take: number
  ) {
    return this.customersService.findAll({ skip, take });
  }

  @Query('customer')
  findOne(@Args('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Mutation('createCustomer')
  create(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
    return this.customersService.create(createCustomerInput);
  }

  @Mutation('updateCustomer')
  update(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    return this.customersService.update(updateCustomerInput.id, updateCustomerInput);
  }

  @Mutation('removeCustomer')
  remove(@Args('id') id: string) {
    return this.customersService.remove(id);
  }
}
