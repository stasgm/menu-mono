export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export const getCustomer = (customers: ICustomer[], customerId: string): ICustomer => {
  const customer = customers.find((el) => el.id === customerId);

  if (!customer) {
    throw new Error('User not found');
  }

  return customer;
};
