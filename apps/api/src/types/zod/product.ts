import * as z from 'zod';
import {
  CompleteCategory,
  RelatedCategoryModel,
  CompleteMenu,
  RelatedMenuModel,
} from './index';

export const ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
});

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  category: CompleteCategory[];
  menus: CompleteMenu[];
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() =>
  ProductModel.extend({
    category: RelatedCategoryModel.array(),
    menus: RelatedMenuModel.array(),
  }),
);
