import { Injectable } from '@nestjs/common';
import { IOrder, IOrderLine } from '@packages/domains';
import { ordersMock } from '@packages/mocks';

import {
  CreateOrderInput,
  CreateOrderLineInput,
  Order,
  OrderLine,
  UpdateOrderInput,
} from '../../types/graphql.schema';
import { tranformProduct } from '../products/products.service';
import { OrdersRepository } from './orders.repository';

const tranformLines = (
  lines: Array<CreateOrderLineInput | null>,
): OrderLine[] => {
  return lines.reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    const product = tranformProduct(cur.productId);

    if (!product) {
      return acc;
    }
    return [
      ...acc,
      {
        id: cur.id,
        quantity: cur.quantity,
        totalAmount: cur.totalAmount,
        price: cur.price,
        product,
      },
    ];
  }, [] as OrderLine[]);
};

const tranformOrderLines = (lines: IOrderLine[]): OrderLine[] => {
  return lines.reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    const product = tranformProduct(+cur.productId);

    if (!product) {
      return acc;
    }

    const orderLine: OrderLine[] = [
      ...acc,
      {
        id: +cur.id,
        quantity: cur.quantity,
        totalAmount: cur.totalAmount,
        price: cur.price,
        product,
      },
    ];

    return orderLine;
  }, [] as OrderLine[]);
};

const transformOrder = (createOrderInput: CreateOrderInput): Order => {
  return {
    ...createOrderInput,
    lines: tranformLines(createOrderInput.lines),
  };
};

const transformOrders = (ordersMock: IOrder[]): Order[] => {
  return ordersMock.map((order) => {
    const newOrder: Order = {
      id: +order.id,
      date: order.date,
      number: order.number,
      status: order.status,
      userName: order.customerDetails.name,
      userPhone: order.customerDetails.phoneNumber,
      lines: tranformOrderLines(order.orderLines),
    };

    return newOrder;
  });
};

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}
  private readonly orders: Order[] = transformOrders(ordersMock);

  create(createOrderInput: CreateOrderInput) {
    return this.ordersRepository.createOrder({ data: createOrderInput });
    // const order = transformOrder(createOrderInput);

    // this.orders.push(order);

    // return order;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find((o) => o.id === id);
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    const index = this.orders.findIndex((o) => o.id === id);
    const order = transformOrder(updateOrderInput);
    this.orders[index] = order;

    return order;
  }

  remove(id: number) {
    const index = this.orders.findIndex((o) => o.id === id);
    const oldOrder = this.orders[index];
    this.orders.splice(index);

    return oldOrder;
  }
}
