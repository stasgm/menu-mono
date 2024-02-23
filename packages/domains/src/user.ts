export const Roles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export interface IUser {
  id: string;
  name: string;
  role: Role;
  active: boolean;
  disabled: boolean;
  passwordHash: string;
  customerId: string;
}

export const getUser = (users: IUser[], userId: string): IUser => {
  const user = users.find((el) => el.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
