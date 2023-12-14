import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCustomerInput, CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('take', { type: () => Int, nullable: true }) take: number
  ) {
    return this.usersService.findAll({ skip, take });
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation('createUser')
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args('createCreateCustomerInput') createCustomerInput: CreateCustomerInput
  ) {
    return this.usersService.create(createCustomerInput, createUserInput);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
