import * as z from 'zod';
import {
  CompleteProduct,
  RelatedProductModel,
  CompleteMenu,
  RelatedMenuModel,
} from './index';

export const MenuLineModel = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  price: z.number().int(),
});

export interface CompleteMenuLine extends z.infer<typeof MenuLineModel> {
  product: CompleteProduct;
  Menu: CompleteMenu[];
}

/**
 * RelatedMenuLineModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuLineModel: z.ZodSchema<CompleteMenuLine> = z.lazy(() =>
  MenuLineModel.extend({
    product: RelatedProductModel,
    Menu: RelatedMenuModel.array(),
  }),
);
