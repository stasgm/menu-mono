import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CategoriesService } from '@/modules/categories/categories.service';
import { Category } from '@/modules/categories/models/category.model';
import { BaseResolver } from '@/modules/common/base.resolver';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver extends BaseResolver(Product, CreateProductInput, UpdateProductInput) {
  constructor(readonly productsService: ProductsService, private readonly categoriesService: CategoriesService) {
    super(productsService);
  }

  // @ResolveField(() => [Category]!)
  // categories(@Parent() product: Product) {
  //   const { categoryIds } = product;
  //   const promise = categoryIds.map((id) => this.categoriesService.findOne(id));
  //   return Promise.all(promise);
  // }
}
