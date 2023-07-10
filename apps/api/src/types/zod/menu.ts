import * as z from 'zod';
import { CompleteProduct, RelatedProductModel } from './index';

export const MenuModel = z.object({
  id: z.number().int(),
  name: z.string(),
});

export interface CompleteMenu extends z.infer<typeof MenuModel> {
  products: CompleteProduct[];
}

/**
 * RelatedMenuModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuModel: z.ZodSchema<CompleteMenu> = z.lazy(() =>
  MenuModel.extend({
    products: RelatedProductModel.array(),
  }),
);
