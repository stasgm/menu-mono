import { PrismaClient } from '@prisma/client';

export type PrismaModel = keyof Omit<
  PrismaClient,
  | '$extends'
  | '$connect'
  | '$disconnect'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$on'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction'
  | '$use'
>;

// export type PrismaModelType = Prisma.TypeMap['model'];
// export type PrismaModelNames = Prisma.ModelName; // "User" | "Post"

// export type PrismaModels = {
//   [M in PrismaModelNames]: Exclude<Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>, null>;
// };
