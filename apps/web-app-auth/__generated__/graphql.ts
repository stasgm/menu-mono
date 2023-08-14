/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateMenuInput = {
  lines: Array<CreateMenuLineInput>;
  name: Scalars['String']['input'];
};

export type CreateMenuLineInput = {
  price: Scalars['Int']['input'];
  productId: Scalars['String']['input'];
};

export type CreateOrderInput = {
  date: Scalars['String']['input'];
  lines: Array<CreateOrderLineInput>;
  userName: Scalars['String']['input'];
  userPhone: Scalars['String']['input'];
};

export type CreateOrderLineInput = {
  price: Scalars['Int']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateProductInput = {
  categories: Array<Scalars['String']['input']>;
  disabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Menu = {
  __typename?: 'Menu';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lines: Array<MenuLine>;
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MenuLine = {
  __typename?: 'MenuLine';
  id: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  product: Product;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createMenu: Menu;
  createOrder: Order;
  createProduct: Product;
  createUser: User;
  removeCategory?: Maybe<Category>;
  removeMenu?: Maybe<Menu>;
  removeOrder?: Maybe<Order>;
  removeProduct?: Maybe<Product>;
  removeUser?: Maybe<User>;
  updateCategory: Category;
  updateMenu: Menu;
  updateOrder: Order;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateUser: User;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateMenuArgs = {
  createMenuInput: CreateMenuInput;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveMenuArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveOrderArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateMenuArgs = {
  updateMenuInput: UpdateMenuInput;
};

export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};

export type MutationUpdateOrderStatusArgs = {
  updateOrderInput: UpdateOrderStatusInput;
};

export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lines: Array<OrderLine>;
  number: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  totalAmount: Scalars['Int']['output'];
  totalProductQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type OrderLine = {
  __typename?: 'OrderLine';
  id: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  totalAmount: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  categories: Array<Category>;
  disabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Maybe<Category>>;
  category?: Maybe<Category>;
  menu?: Maybe<Menu>;
  menus: Array<Menu>;
  order?: Maybe<Order>;
  orders: Array<Maybe<Order>>;
  product?: Maybe<Product>;
  products: Array<Product>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};

export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};

export type QueryMenuArgs = {
  id: Scalars['String']['input'];
};

export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};

export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateMenuInput = {
  id: Scalars['String']['input'];
  lines: Array<CreateMenuLineInput>;
  name: Scalars['String']['input'];
};

export type UpdateOrderInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  lines: Array<CreateOrderLineInput>;
  userName: Scalars['String']['input'];
  userPhone: Scalars['String']['input'];
};

export type UpdateOrderStatusInput = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type UpdateProductInput = {
  categories: Array<Scalars['String']['input']>;
  disabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    id: string;
    name: string;
    disabled: boolean;
    categories: Array<{ __typename?: 'Category'; id: string; name: string }>;
  }>;
};

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type GetProductByIdQuery = {
  __typename?: 'Query';
  product?: { __typename?: 'Product'; id: string; name: string } | null;
};

export const GetAllProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'disabled' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getProductById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
