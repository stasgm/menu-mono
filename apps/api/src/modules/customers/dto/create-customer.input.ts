import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '../../common/base.dto';

@InputType('CreateCustomerInput')
export class CreateCustomerInput extends CreateBaseInput {
  @Field(() => String, { description: 'First name' })
  firstName: string;

  @Field(() => String, { description: 'Last name' })
  lastName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'Phone number' })
  phoneNumber: string;
}
