import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { RequestContext } from 'common/request.context';
import { ConfigService } from '@nestjs/config'; // Assuming ConfigService is also required for UserService

describe('UserService', () => {
  let service: UserService;
  let userRepoMock: any;
  let transactionalConnectionMock: any;
  let queryRunnerMock: any;
  let configServiceMock: any;

  beforeEach(async () => {
    // Mock Repository to avoid database interaction
    userRepoMock = {
      save: jest.fn().mockResolvedValue({
        id: '1',
        name: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'hashedPassword', // mock the saved data
      }),
    };

    // Mock the QueryRunner for transaction handling
    queryRunnerMock = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    // Mock the TransactionalConnection to return the queryRunner
    transactionalConnectionMock = {
      getQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
    };

    // Mock ConfigService if required by your UserService
    configServiceMock = {
      get: jest.fn().mockReturnValue('mockConfigValue'), // Adjust as per your actual usage
    };

    // Initialize the testing module with just the necessary dependencies
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: userRepoMock }, // Inject the mock repository
        {
          provide: 'TransactionalConnection',
          useValue: transactionalConnectionMock,
        }, // Inject the mock transactional connection
        { provide: ConfigService, useValue: configServiceMock }, // Inject the mock ConfigService if required
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and return the saved user', async () => {
    // Arrange
    const ctx: RequestContext = {} as RequestContext;
    const userDetails: CreateUserDTO = {
      name: 'John',
      email: 'john@example.com',
      password: 'securePassword',
      phoneNumber: '1234567890',
    };

    // Act
    const result = await service.create(ctx, userDetails);

    // Assert
    expect(userRepoMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password, // Password will remain as plain text in this mock
        phoneNumber: userDetails.phoneNumber,
      }),
    );
    expect(result).toEqual({
      id: '1',
      name: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      password: 'hashedPassword',
    });
  });
});
