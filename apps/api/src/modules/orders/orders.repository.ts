import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';
import { CustomersService } from '@/modules/customers/customers.service';

import { CreateOrderInput } from './dto/inputs/create-order.input';
import { CreateOrderLineInput } from './dto/inputs/create-order-line.input';
import { UpdateOrderInput } from './dto/inputs/update-order.input';
import { UpdateOrderStatusInput } from './dto/inputs/update-order-status.input';
import { Order, OrderWithKeys } from './models/order.model';

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
        productId: cur.product.id,
      },
    ];
  }, [] as Prisma.OrderLineUncheckedCreateWithoutOrderInput[]);

  return {
    create: createOrderLines,
  };
};

@Injectable()
export class OrdersRepository extends BaseRepository(Order, OrderWithKeys, 'order') {
  constructor(readonly prisma: PrismaService, private customersService: CustomersService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    return this.getOrders(params);
  }

  findOne(id: string) {
    return this.getOrderById(id);
  }

  create(data: CreateOrderInput) {
    return Promise.reject(null);
    // return this.createOrder({ data });
  }

  update(id: string, data: UpdateOrderInput) {
    return Promise.resolve(null);
    // return this.updateOrder({ data, where: { id } });
  }

  remove(id: string) {
    return Promise.resolve(null);
    // return this.deleteOrder({ where: { id } });
  }

  async createOrder(params: { data: CreateOrderInput }) {
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

    return this.model.create({
      data: {
        date: new Date(data.date),
        customerId: customer.id,
        totalProductQuantity,
        totalAmount,
        lines: createOrderLinesByLines(data.lines ?? []),
      },
      include: orderInclude,
    });
  }

  getOrderByNumber(number: number) {
    return this.getOrder({ where: { number } });
  }

  getOrder(params: { where: Prisma.OrderWhereInput }) {
    const { where } = params;
    return this.model.findFirst({ where, include: orderInclude });
  }

  getOrderById(id: string) {
    return this.model.findUnique({
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
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.model.findMany({
      skip,
      include: orderInclude,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateOrder(params: { where: Prisma.OrderWhereUniqueInput; data: UpdateOrderInput }) {
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

    return this.model.update({
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

  updateOrderStatus(params: { where: Prisma.OrderWhereUniqueInput; data: UpdateOrderStatusInput }) {
    const { where, data } = params;

    return this.model.update({
      where,
      data: {
        status: data.status,
      },
      include: orderInclude,
    });
  }

  deleteOrder(params: { where: Prisma.OrderWhereUniqueInput }) {
    const { where } = params;
    return this.model.delete({ where });
  }
}
