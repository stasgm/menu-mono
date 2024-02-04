import { Test, TestingModule } from '@nestjs/testing';
import { usersMock } from '@packages/mocks';

// import { User } from './models/user.model';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

// type UserWithoutPassword = Omit<User, 'passwordHash'>;

// const usersMock: UserWithoutPassword[] = [
//   {
//     id: '1',
//     name: 'test1',
//     active: true,
//     customerId: '1',
//     role: 'user',
//   },
//   {
//     id: '2',
//     name: 'test2',
//     active: true,
//     customerId: '2',
//     role: 'admin',
//   },
// ];

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const usersRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: usersRepositoryMock,
        },
      ],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call getUsers with the correct params', async () => {
      const params = { skip: 10, take: 20 };
      const getCustomersSpy = jest.spyOn(usersRepository, 'findAll');
      await service.findAll(params);
      expect(getCustomersSpy).toHaveBeenCalledWith(params);
    });

    it('should call getUsers with default params if no params are provided', async () => {
      const getCustomersSpy = jest
        .spyOn(usersRepository, 'findAll')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .mockResolvedValue(usersMock as any);
      await service.findAll({});
      expect(getCustomersSpy).toHaveBeenCalledWith({ skip: 0, take: 100 });
    });
  });
});
