import { InputType, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType('UpdateProductInput', { description: 'Update product input' })
export class UpdateProductInput extends PartialType(CreateProductInput) {}
