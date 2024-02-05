import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAccessAuthGuard } from '../auth/guards/jwt-access.guard';
import { FindUsersArgs } from './dto/find-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@UseGuards(JwtAccessAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User]!, {
    name: 'findAllUsers',
    description: 'Find all users',
  })
  findAll(@Args() args: FindUsersArgs) {
    return this.usersService.findAll(args);
  }

  @Query(() => User, { name: 'findOneUser', description: 'Find one user by id' })
  async findOne(@Args({ name: 'id', type: () => String }) id: string) {
    const result = await this.usersService.findOne(id);

    if (!result) {
      throw new NotFoundException(`A user with id '${id}' not found`);
    }

    return result;
  }

  @Mutation(() => User, { name: 'updateUser', description: 'Update one user' })
  async update(@Args('id') id: string, @Args('updateUserInput') data: UpdateUserInput) {
    const result = await this.usersService.update(id, data);

    if (!result) {
      throw new NotFoundException(`A user with id '${id}' not found`);
    }

    return result;
  }

  @Mutation(() => User, { name: `removeUser`, description: `Remove one user` })
  remove(@Args('id') id: string) {
    const result = this.usersService.remove(id);

    if (!result) {
      throw new NotFoundException(`A user with id '${id}' not found`);
    }

    return result;
  }
}
