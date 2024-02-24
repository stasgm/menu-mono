import { InputType, PickType } from '@nestjs/graphql';

import { Order } from '../../models/order.model';

@InputType()
export class UpdateOrderStatusInput extends PickType(Order, ['status']) {}
