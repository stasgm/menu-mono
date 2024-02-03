import { Mutation, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CustomersService } from '../customers/customers.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver extends BaseResolver(User, CreateUserInput, UpdateUserInput) {
  constructor(readonly usersService: UsersService, private readonly customersService: CustomersService) {
    super(usersService);
  }

  @Mutation(() => User)
  create() {
    return;
  }

  // @ResolveField()
  // customer(@Parent() customer: Customer) {
  //   const { id } = customer;
  //   return this.customersService.findOne(id);
  // }
}
