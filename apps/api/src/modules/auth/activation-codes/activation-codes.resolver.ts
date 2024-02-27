import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// import { ContextData, CurrentUser } from '../auth/decorators';
// import { JwtActivateAuthGuard } from '../auth/guards';
// import { IContextData, IReqUserData } from '../auth/types';
import { ActivationCodesService } from './activation-codes.service';
import { CreateActivationCodeInput } from './dto/inputs/create-activation-code.input';
import { FindActivationCodesArgs } from './dto/inputs/find-activation-code.args';
import { UpdateActivationCodeInput } from './dto/inputs/update-activation-code.input';
import { ActivationCode } from './models/activation-code.model';

@Resolver(() => ActivationCode)
export class ActivationCodesResolver {
  constructor(private readonly activationCodesService: ActivationCodesService) {}

  @Query(() => [ActivationCode], {
    name: 'findAllActivationCodes',
    description: 'Find all activationCodes',
  })
  findAll(@Args() args: FindActivationCodesArgs) {
    return this.activationCodesService.findAll(args);
  }

  @Query(() => ActivationCode, { name: 'findOneActivationCode', description: 'Find one activationCode by id' })
  async findOne(@Args({ name: 'id', type: () => String }) id: string) {
    const result = await this.activationCodesService.findOne(id);

    if (!result) {
      throw new NotFoundException(`ActivationCode with id '${id}' not found`);
    }

    return result;
  }

  @Mutation(() => ActivationCode, { name: 'createActivationCode', description: 'Create one activationCode' })
  async create(@Args('createActivationCodeInput') data: CreateActivationCodeInput) {
    const result = await this.activationCodesService.create(data);

    if (!result) {
      throw new NotFoundException('An error occurred while creating the activation code');
    }

    return result;
  }

  @Mutation(() => ActivationCode, { name: 'updateActivationCode', description: 'Update one activationCode' })
  async update(@Args('id') id: string, @Args('updateActivationCodeInput') data: UpdateActivationCodeInput) {
    const result = await this.activationCodesService.update(id, data);

    if (!result) {
      throw new NotFoundException(`ActivationCode with id '${id}' not found`);
    }

    return result;
  }

  // TODO: Only for SUPER_ADMIN
  // @UseGuards(JwtActivateAuthGuard)
  // @Mutation(() => ActivationCode, {
  //   name: 'refreshCodeActivationCode',
  //   description: 'Refresh code in activationCode',
  // })
  // async refreshCode(@ContextData() ctx: IContextData, @Args('userId') userId: string,) {
  //   return await this.activationCodesService.createOrRefreshCodeAndSendEmail({
  //     userId: req.user.id,
  //     info: {
  //       originIp: ctx.originIp ?? 'Unknown',
  //       device: ctx.userAgent ?? 'Unknown',
  //       location: 'Unknown',
  //     },
  //   });
  // }

  @Mutation(() => ActivationCode, { name: `removeActivationCode`, description: `Remove one activationCode` })
  remove(@Args('id') id: string) {
    const result = this.activationCodesService.remove(id);

    if (!result) {
      throw new NotFoundException(`ActivationCode with id '${id}' not found`);
    }

    return result;
  }
}
