import { InputType, PartialType } from '@nestjs/graphql';

import { CreateCustomerInput } from './create-customer.input';

@InputType('UpdateCustomerInput', { description: 'Update user input' })
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {}
