import { Role, Roles } from '@packages/domains';
import { customersMock, usersMock } from '@packages/mocks';

export const userData = usersMock[0];
export const { id, ...customerData } = customersMock[0];

export const userPassword = '1234';
export const activationCode = '12345';
export const getUserData = (createUserData: CreateUserData) => {
  const { name = userData.name, active = false, disabled = false, passwordHash, role = Roles.USER } = createUserData;

  return {
    name,
    active,
    disabled,
    passwordHash,
    role,
    customer: {
      create: customerData,
    },
  };
};

export type CreateUserData = {
  passwordHash: string;
  name?: string;
  disabled?: boolean;
  active?: boolean;
  role?: Role;
};
