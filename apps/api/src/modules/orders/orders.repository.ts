import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

import {
  CreateOrderInput,
  CreateOrderLineInput,
  UpdateOrderInput,
} from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';
import { UsersService } from '../users/users.service';

const orderInclude = Prisma.validator<Prisma.OrderInclude>()({
  _count: {
    select: {
      lines: true,
    },
  },
  user: true,
  lines: {
    include: {
      product: {
        include: {
          categories: true,
        },
      },
    },
  },
});

const createOrderLinesByLines = (
  orderLines: Array<CreateOrderLineInput | null>,
): Prisma.OrderLineUncheckedCreateNestedManyWithoutOrderInput => {
  const createOrderLines: Prisma.OrderLineUncheckedCreateWithoutOrderInput[] = orderLines.reduce(
    (acc, cur) => {
      if (!cur) {
        return acc;
      }

      return [
        ...acc,
        {
          price: cur.price,
          quantity: cur.quantity,
          totalAmount: cur.totalAmount,
          productId: cur.productId,
        },
      ];
    },
    [] as Prisma.OrderLineUncheckedCreateWithoutOrderInput[],
  );

  return {
    create: createOrderLines,
  };
};

@Injectable()
export class OrdersRepository {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createOrder(params: { data: CreateOrderInput }): Promise<Order> {
    const { data } = params;

    const user = await this.usersService.findByPhoneNumberOrCreate(data.userName, data.userPhone);

    const lines = createOrderLinesByLines(data.lines);

    // calculate again
    const totalProductQuantity = 0;
    const totalAmount = 0;

    return this.prisma.order.create({
      data: {
        date: new Date(data.date),
        number: data.number,
        status: data.status,
        userId: user.id,
        totalProductQuantity,
        totalAmount,
        lines,
      },
      include: orderInclude,
    });
  }

  getOrderByNumber(number: number): Promise<Order | null> {
    return this.getOrder({ where: { number } });
  }

  getOrder(params: { where: Prisma.OrderWhereInput }) {
    const { where } = params;
    return this.prisma.order.findFirst({ where, include: orderInclude });
  }

  getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: orderInclude,
    });
  }

  async getOrders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      include: orderInclude,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: UpdateOrderInput;
  }): Promise<Order | null> {
    const { where, data } = params;

    const user = await this.usersService.findByPhoneNumberOrCreate(data.userName, data.userPhone);

    const lines = createOrderLinesByLines(data.lines);

    // calculate again
    const totalProductQuantity = 0;
    const totalAmount = 0;

    return this.prisma.order.update({
      where,
      data: {
        date: new Date(data.date),
        number: data.number,
        status: data.status,
        userId: user.id,
        totalProductQuantity,
        totalAmount,
        lines,
      },
      include: orderInclude,
    });
  }

  async deleteOrder(params: { where: Prisma.OrderWhereUniqueInput }): Promise<Order> {
    const { where } = params;
    return this.prisma.order.delete({ where });
  }
}
