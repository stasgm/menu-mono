/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCategoryInput {
  name?: Nullable<string>;
}

export class UpdateCategoryInput {
  id: number;
  name?: Nullable<string>;
}

export class CreateMenuInput {
  name?: Nullable<string>;
}

export class UpdateMenuInput {
  id: number;
  name?: Nullable<string>;
}

export class CreateProductInput {
  name?: Nullable<string>;
}

export class UpdateProductInput {
  id: number;
  name?: Nullable<string>;
}

export class Category {
  id?: Nullable<number>;
  name?: Nullable<string>;
}

export abstract class IQuery {
  abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

  abstract category(
    id: number,
  ): Nullable<Category> | Promise<Nullable<Category>>;

  abstract menus(): Nullable<Menu>[] | Promise<Nullable<Menu>[]>;

  abstract menu(id: number): Nullable<Menu> | Promise<Nullable<Menu>>;

  abstract products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

  abstract product(id: number): Nullable<Product> | Promise<Nullable<Product>>;
}

export abstract class IMutation {
  abstract createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Category | Promise<Category>;

  abstract updateCategory(
    updateCategoryInput: UpdateCategoryInput,
  ): Category | Promise<Category>;

  abstract removeCategory(
    id: number,
  ): Nullable<Category> | Promise<Nullable<Category>>;

  abstract createMenu(createMenuInput: CreateMenuInput): Menu | Promise<Menu>;

  abstract updateMenu(updateMenuInput: UpdateMenuInput): Menu | Promise<Menu>;

  abstract removeMenu(id: number): Nullable<Menu> | Promise<Nullable<Menu>>;

  abstract createProduct(
    createProductInput: CreateProductInput,
  ): Product | Promise<Product>;

  abstract updateProduct(
    updateProductInput: UpdateProductInput,
  ): Product | Promise<Product>;

  abstract removeProduct(
    id: number,
  ): Nullable<Product> | Promise<Nullable<Product>>;
}

export class MenuLines {
  id?: Nullable<number>;
  price?: Nullable<number>;
  product?: Nullable<Product>;
}

export class Menu {
  id?: Nullable<number>;
  name?: Nullable<string>;
  lines: Nullable<MenuLines>[];
}

export class Product {
  id?: Nullable<number>;
  name?: Nullable<string>;
  categories?: Nullable<Nullable<Category>[]>;
}

type Nullable<T> = T | null;
