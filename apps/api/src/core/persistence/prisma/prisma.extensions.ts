import { Prisma } from '@prisma/client';

// https://medium.com/@erciliomarquesmanhica/implementing-soft-delete-in-prisma-using-client-extensions-a-step-by-step-guide-for-nestjs-51a9d0716831

//extension for soft delete
export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      delete<M, A>(this: M, where: Prisma.Args<M, 'delete'>['where']): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});

// //extension for soft delete Many
// export const softDeleteMany = Prisma.defineExtension({
//   name: 'softDeleteMany',
//   model: {
//     $allModels: {
//       async deleteMany<M, A>(
//         this: M,
//         where: Prisma.Args<M, 'deleteMany'>['where'],
//       ): Promise<Prisma.Result<M, A, 'updateMany'>> {
//         const context = Prisma.getExtensionContext(this);

//         return (context as any).updateMany({
//           where,
//           data: {
//             deleted_at: new Date(),
//           },
//         });
//       },
//     },
//   },
// });

// //extension for filtering soft deleted rows from queries
// export const filterSoftDeleted = Prisma.defineExtension({
//   name: 'filterSoftDeleted',
//   query: {
//     $allModels: {
//       async $allOperations({ model, operation, args, query }) {
//         if (
//           operation === 'findUnique' ||
//           operation === 'findFirst' ||
//           operation === 'findMany'
//         ) {
//           args.where = { ...args.where, deletedAt: null };
//           return query(args);
//         }
//         return query(args);
//       },
//     },
//   },
// });
