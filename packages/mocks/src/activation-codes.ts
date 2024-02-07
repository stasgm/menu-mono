import { IActivationCode } from '@packages/domains';
import { usersMock } from './users';

export const activationCodesMock: IActivationCode[] = [
  {
    id: '6c1b7908-dfe4-4bc0-a412-22ffd24529f0',
    attempts: 0,
    code: '9874',
    userId: usersMock[0].id,
  },
  {
    id: '20236b66-04a9-45cf-9dd9-47af2f7ebe91',
    attempts: 2,
    code: '4321',
    userId: usersMock[1].id,
  },
  {
    id: '59e5944d-53a8-4e49-87d0-88708e6c11d2',
    attempts: 3,
    code: '1234',
    userId: usersMock[2].id,
  },
];
