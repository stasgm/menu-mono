import { Injectable } from '@nestjs/common';
import { ICustomerDetails } from '@packages/domains';
import { Order, Prisma } from '@prisma/client';

import {
  CreateOrderInput,
  CreateOrderLineInput,
} from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { OrderLineDto } from './dto/create-order-line.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

// const orderInclude = Prisma.validator<Prisma.OrderInclude>()({
//   _count: {
//     select: {
//       categories: true,
//     },
//   },
//   categories: true,
// });

const createOrderLinesByLines = (
  orderLines: Array<CreateOrderLineInput | null>,
): Prisma.OrderLineUncheckedCreateNestedManyWithoutOrderInput => {
  const createOrderLines: Prisma.OrderLineUncheckedCreateWithoutOrderInput[] =
    orderLines.reduce((acc, cur) => {
      if (!cur) {
        return acc;
      }

      return [
        ...acc,
        {
          price: cur.price,
          quantity: cur.quantity,
          totalAmount: cur.totalAmount,
          productId: +cur.productId,
        },
      ];
    }, [] as Prisma.OrderLineUncheckedCreateWithoutOrderInput[]);

  return {
    create: createOrderLines,
  };
};

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(params: { data: CreateOrderInput }): Promise<Order> {
    const { data } = params;

    const userId = await this.getUserId({
      name: data.userName,
      phoneNumber: data.userPhone,
    });

    const lines = createOrderLinesByLines(data.lines);

    // calculate again
    const totalProductQuantity = 0;
    const totalAmount = 0;

    return this.prisma.order.create({
      data: {
        date: new Date(data.date),
        number: data.number,
        status: data.number,
        userId,
        totalProductQuantity,
        totalAmount,
        lines,
      },
      // data: {
      //   ...data,
      //   lines,
      //   categories,
      // },
      // include: {
      //   categories: { select: { name: true } },
      // },
    });
  }

  // getOrderByName(name: string): Promise<Order | null> {
  //   return this.getOrder({ where: { name } });
  // }

  // getOrder(params: { where: Prisma.OrderWhereUniqueInput }) {
  //   const { where } = params;
  //   return this.prisma.order.findUnique({ where, include: orderInclude });
  // }

  // async getOrders(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.OrderWhereUniqueInput;
  //   where?: Prisma.OrderWhereInput;
  //   orderBy?: Prisma.OrderOrderByWithRelationInput;
  // }): Promise<Order[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.order.findMany({
  //     skip,
  //     include: orderInclude,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  // async updateOrder(params: {
  //   where: Prisma.OrderWhereUniqueInput;
  //   data: UpdateOrderDto;
  // }): Promise<Order | null> {
  //   const { where, data } = params;

  //   const categories = this.connectCategoriesById(data.categories);
  //   const lines = this.convertLines(data.lines);

  //   return this.prisma.order.update({
  //     where,
  //     data: {
  //       ...data,
  //       lines,
  //       categories,
  //     },
  //     include: {
  //       categories: { select: { name: true } },
  //     },
  //   });
  // }

  // async deleteOrder(params: {
  //   where: Prisma.OrderWhereUniqueInput;
  // }): Promise<Order> {
  //   const { where } = params;
  //   return this.prisma.order.delete({ where });
  // }

  // /**
  //  * Format the categories IDs array into the prisma query way
  //  */
  // private connectCategoriesById(
  //   category: number[] | undefined,
  // ): Prisma.OrderCategoryUncheckedCreateNestedManyWithoutOrdersInput {
  //   const categories = category?.map((id) => ({ id }));

  //   return {
  //     connect: categories,
  //   };
  // }

  // private convertLines(lines: OrderLineDto[] | undefined) {
  //   const plainLines: Prisma.InputJsonValue | undefined = lines?.map(
  //     (line) => ({
  //       price: line.price,
  //       productId: line.productId,
  //     }),
  //   );

  //   return plainLines;
  // }

  // move to User service
  private async getUserId(customerDetails: ICustomerDetails) {
    const user = await (async () => {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          phoneNumber: customerDetails.phoneNumber,
        },
      });

      if (existingUser) {
        return existingUser;
      }

      return await this.prisma.user.create({
        data: {
          name: customerDetails.name,
          phoneNumber: customerDetails.phoneNumber,
        },
      });
    })();

    return user.id;
  }
}
