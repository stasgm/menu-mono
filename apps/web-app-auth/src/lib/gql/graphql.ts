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
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any };
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createProject: Project;
  deletePost: Post;
  login: UserResponse;
  register: UserResponse;
  updatePost: Post;
};

export type MutationCreatePostArgs = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  coverImg?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateProjectArgs = {
  bullets: Array<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  devPeriod: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type MutationDeletePostArgs = {
  uuid: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  options: LoginInput;
};

export type MutationRegisterArgs = {
  options: RegisterNewUserInput;
};

export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  abstract?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  bullets: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  devPeriod: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getPostByUuid?: Maybe<Post>;
  getPosts: Array<Post>;
  getProjects: Array<Project>;
  getUsers: Array<User>;
  me?: Maybe<User>;
};

export type QueryGetPostByUuidArgs = {
  uuid: Scalars['String']['input'];
};

export type RegisterNewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  img: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPostsQuery = {
  __typename?: 'Query';
  getPosts: Array<{
    __typename?: 'Post';
    uuid: string;
    title: string;
    content: string;
    abstract?: string | null;
    coverImg?: string | null;
    updatedAt: any;
    createdAt: any;
  }>;
};

export type GetPostByUuidQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;

export type GetPostByUuidQuery = {
  __typename?: 'Query';
  getPostByUuid?: {
    __typename?: 'Post';
    uuid: string;
    title: string;
    content: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export const GetAllPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllPosts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPosts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'abstract' } },
                { kind: 'Field', name: { kind: 'Name', value: 'coverImg' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetPostByUuidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPostByUuid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
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
            name: { kind: 'Name', value: 'getPostByUuid' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'uuid' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPostByUuidQuery, GetPostByUuidQueryVariables>;
