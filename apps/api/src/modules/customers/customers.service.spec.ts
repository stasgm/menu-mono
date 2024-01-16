import { Test, TestingModule } from '@nestjs/testing';

import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let customersRepository: CustomersRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const customersRepositoryMock = {
      getCustomers: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CustomersRepository,
          useValue: customersRepositoryMock,
        },
      ],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    service = module.get<CustomersService>(CustomersService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call getCustomers with the correct params', async () => {
      const params = { skip: 10, take: 20 };
      const getCustomersSpy = jest.spyOn(customersRepository, 'getCustomers');
      await service.findAll(params);
      expect(getCustomersSpy).toHaveBeenCalledWith(params);
    });

    it('should call getCustomers with default params if no params are provided', async () => {
      const getCustomersSpy = jest.spyOn(customersRepository, 'getCustomers');
      await service.findAll({});
      expect(getCustomersSpy).toHaveBeenCalledWith({ skip: 0, take: 100 });
    });
  });
});
