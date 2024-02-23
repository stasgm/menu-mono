import { IUser } from '@packages/domains';
import { customersMock } from './customers';

// passwords = names
export const usersMock: IUser[] = [
  {
    id: '1a8f7e6c-9734-11ee-b9d1-0242ac120002',
    name: 'Stas',
    active: true,
    role: 'SUPER_ADMIN',
    disabled: true,
    passwordHash: '$2a$04$Itqh6ragYeLMrPsWPRV4e.fFl2754Xc39KxPVgjI6P9zpkdrwAjB6',
    customerId: customersMock[0].id,
  },
  {
    id: '1a8f8146-9734-11ee-b9d1-0242ac120002',
    name: 'Olya',
    active: true,
    disabled: true,
    passwordHash: '$2a$04$tyUFEuOW9uDuFFpuenA2GeCuBNGD7n5nsOeZf/kOyL.WBmxCVfPne',
    role: 'ADMIN',
    customerId: customersMock[1].id,
  },
  {
    id: '1a8f829a-9734-11ee-b9d1-0242ac120002',
    name: 'Nox',
    active: false,
    disabled: false,
    role: 'USER',
    passwordHash: '$2a$04$6trfsTDmqWth6JKDePf.terfK92yra0CpSaDpWW682XU8IXmS/KnC',
    customerId: customersMock[2].id,
  },
];
