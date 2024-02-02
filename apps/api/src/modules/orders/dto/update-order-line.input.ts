import { InputType, PartialType } from '@nestjs/graphql';

import { CreateOrderLineInput } from './create-order-line.input';

@InputType()
export class UpdateOrderLineInput extends PartialType(CreateOrderLineInput) {}
