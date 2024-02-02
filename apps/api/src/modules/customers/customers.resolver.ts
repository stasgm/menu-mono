import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CustomersService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { FindCustomersArgs } from './dto/find-customers.args';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './models/customer.model';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  // @Query(() => [Customer], { name: 'FindCustomers', description: 'Find customers' })
  // findCustomers(@Args() args: FindCustomersArgs) {
  //   const { skip, take } = args;
  //   return this.customersService.findAll({ skip, take });
  // }

  // @Query(() => Customer, { name: 'FindCustomer', description: 'Find customer' })
  // findCustomer(@Args('id', { type: () => String }) id: string) {
  //   return this.customersService.findOne(id);
  // }

  // @Mutation(() => Customer, { name: 'CreateCustomer', description: 'Create customer' })
  // createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
  //   return this.customersService.create(createCustomerInput);
  // }

  // @Mutation(() => Customer, { name: 'UpdateCustomer', description: 'Update customer' })
  // updateCustomer(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
  //   return this.customersService.update(updateCustomerInput.id, updateCustomerInput);
  // }

  // @Mutation(() => Customer, { name: 'DeleteCustomer', description: 'Delete customer' })
  // deleteCustomer(@Args('id', { type: () => String }) id: string) {
  //   return this.customersService.remove(id);
  // }
}
