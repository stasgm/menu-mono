import { customersMock, usersMock } from '@packages/mocks';

export const userData = usersMock[0];
export const customerData = customersMock[0];

export const userPassword = '1234';
export const activationCode = '12345';
export const newUserData = {
  name: userData.name,
  active: false,
  disabled: false,
  role: 'USER',
  customer: {
    create: customerData,
  },
};
