import * as z from 'zod';
import {
  CompleteCategory,
  RelatedCategoryModel,
  CompleteMenuLine,
  RelatedMenuLineModel,
} from './index';

export const ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
});

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  categories: CompleteCategory[];
  MenuLine: CompleteMenuLine[];
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() =>
  ProductModel.extend({
    categories: RelatedCategoryModel.array(),
    MenuLine: RelatedMenuLineModel.array(),
  }),
);
