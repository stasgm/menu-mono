import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { FindUsersArgs } from './dto/find-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'FindUsers', description: 'Find users' })
  findUsers(@Args() findUsersArgs: FindUsersArgs) {
    const { skip, take } = findUsersArgs;
    return this.usersService.findAll({ skip, take });
  }

  @Query(() => User, { name: 'FindUser', description: 'Find user by id' })
  findUser(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'CreateUser', description: 'Create user' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'UpdateUser', description: 'Update user' })
  updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: 'RemoveUser', description: 'Remove user' })
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
