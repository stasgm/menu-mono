import { ObjectType } from '@nestjs/graphql';

import { BaseNamedEntity } from '../../common/base.entity';

@ObjectType({ description: 'Category' })
export class Category extends BaseNamedEntity {}
