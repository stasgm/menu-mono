import { Field, InputType, PickType } from '@nestjs/graphql';

import { CreateCustomerInput } from '../../customers/dto/create-customer.input';
import { User } from '../models/user.model';

// import { CreateCustomerInput } from '../../customers/dto/create-customer.input';

@InputType('CreateUserInput', { description: 'Create user input' })
export class CreateUserInput extends PickType(User, ['name']) {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password hash' })
  passwordHash: string;

  @Field(() => String, { description: 'User role' })
  role: string;

  @Field(() => Boolean, { description: 'User role' })
  active: boolean;

  @Field(() => Boolean, { description: 'User role' })
  confirmed: boolean;

  // @Field(() => CreateCustomerInput, { description: 'Customer' })
  // customer: CreateCustomerInput;
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

// @InputType()
// export class CreateUserInput extends IntersectionType(UserInput, CreateCustomerInput) {}
