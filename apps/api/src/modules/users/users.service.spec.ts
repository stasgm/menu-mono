import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should find a user', async () => {
  //   const user = await service.findUserById('someUserId');
  //   expect(user).toBeDefined();
  // });

  // it('should create a user', async () => {
  //   const user = await service.createUser({ /* user data here */ });
  //   expect(user).toBeDefined();
  // });

  // it('should update a user', async () => {
  //   const updatedUser = await service.updateUser('someUserId', { /* new user data here */ });
  //   expect(updatedUser).toBeDefined();
  // });

  // it('should delete a user', async () => {
  //   const result = await service.deleteUser('someUserId');
  //   expect(result).toBe(true);
  // });
});
