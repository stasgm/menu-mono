import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

import { PrismaService } from '../../core/persistence/prisma/prisma.service';
import { CustomersService } from '../customers/customers.service';
import { CreateOrderInput } from './dto/create-order.input';
import { CreateOrderLineInput } from './dto/create-order-line.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';

const orderInclude = Prisma.validator<Prisma.OrderInclude>()({
  _count: {
    select: {
      lines: true,
    },
  },
  customer: true,
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

const calculateTotalAmount = (cur: { quantity: number; price: number }): number => {
  return cur.quantity * cur.price;
};

const createOrderLinesByLines = (
  orderLines: Array<CreateOrderLineInput>
): Prisma.OrderLineUncheckedCreateNestedManyWithoutOrderInput => {
  const createOrderLines: Prisma.OrderLineUncheckedCreateWithoutOrderInput[] = orderLines.reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    return [
      ...acc,
      {
        price: cur.price,
        quantity: cur.quantity,
        totalAmount: calculateTotalAmount(cur),
        productId: cur.productId,
      },
    ];
  }, [] as Prisma.OrderLineUncheckedCreateWithoutOrderInput[]);

  return {
    create: createOrderLines,
  };
};

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService, private customersService: CustomersService) {}

  async createOrder(params: { data: CreateOrderInput }): Promise<Order> {
    const { data } = params;

    const customer = await (async () => {
      if (data.customerId) {
        const existingCustomer = await this.customersService.findOne(data.customerId);

        if (!existingCustomer) {
          throw new Error('Customer not found');
        }
      }

      // TODO customer fields must be mandatory
      return this.customersService.findByPhoneNumberOrCreate({
        email: data.email!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        phoneNumber: data.phoneNumber!,
      });
    })();

    //TODO: calculate in domains again -> move to service
    const totalProductQuantity = 0;
    const totalAmount = 0;

    return this.prisma.order.create({
      data: {
        date: new Date(data.date),
        customerId: customer.id,
        totalProductQuantity,
        totalAmount,
        lines: createOrderLinesByLines(data.lines || []),
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

  getOrders(params: {
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

  async updateOrder(params: { where: Prisma.OrderWhereUniqueInput; data: UpdateOrderInput }): Promise<Order | null> {
    const { where, data } = params;

    const customer = await (async () => {
      if (data.customerId) {
        const existingCustomer = await this.customersService.findOne(data.customerId);

        if (!existingCustomer) {
          throw new Error('Customer not found');
        }
      }

      // TODO customer fields must be mandatory
      return this.customersService.findByPhoneNumberOrCreate({
        email: data.email!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        phoneNumber: data.phoneNumber!,
      });
    })();

    //TODO: calculate in domains again -> move to service
    const totalProductQuantity = 0;
    const totalAmount = 0;

    return this.prisma.order.update({
      where,
      data: {
        date: new Date(data.date!),
        customerId: customer.id,
        totalProductQuantity,
        totalAmount,
        lines: createOrderLinesByLines(data.lines || []),
      },
      include: orderInclude,
    });
  }

  updateOrderStatus(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: UpdateOrderStatusInput;
  }): Promise<Order | null> {
    const { where, data } = params;

    return this.prisma.order.update({
      where,
      data: {
        status: data.status,
      },
      include: orderInclude,
    });
  }

  deleteOrder(params: { where: Prisma.OrderWhereUniqueInput }): Promise<Order> {
    const { where } = params;
    return this.prisma.order.delete({ where });
  }
}
