export interface IUser {
  id: string;
  name: string;
  phoneNumber: string;
}

export const getUser = (users: IUser[], userId: string): IUser => {
  const user = users.find((el) => el.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
