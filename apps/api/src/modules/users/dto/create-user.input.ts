import { Field, InputType, IntersectionType } from '@nestjs/graphql';

import { CreateCustomerInput } from '../../customers/dto/create-customer.input';

@InputType()
export class UserInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}

// @ObjectType()
// export class CustomerInfo {
//   @Field(() => String, { description: 'First name' })
//   firstName: string;

//   @Field(() => String, { description: 'Last name' })
//   lastName: string;

//   @Field(() => String, { description: 'email' })
//   email: string;

//   @Field(() => String, { description: 'Phone number' })
//   phoneNumber: string;
// }

@InputType()
export class CreateUserInput extends IntersectionType(UserInput, CreateCustomerInput) {}
