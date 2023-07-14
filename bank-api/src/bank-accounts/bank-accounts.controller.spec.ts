import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountRepository } from '../@core/domain/bank-account.repository';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';

describe('BankAccountsController', () => {
  let controller: BankAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountsController],
      providers: [
        BankAccountsService,
        {
          provide: getRepositoryToken(BankAccountSchema),
          useClass: BankAccountTypeOrmRepository,
        },
        {
          provide: DataSource,
          useFactory: async () => {
            const dataSource = new DataSource({
              type: 'sqlite',
              database: ':memory:',
              synchronize: true,
              logging: true,
              entities: [BankAccountSchema],
            });

            if (!dataSource.isInitialized) {
              await dataSource.initialize();
            }

            return dataSource;
          },
        },
        {
          provide: BankAccountTypeOrmRepository,
          useFactory: (dataSource: DataSource) => {
            return new BankAccountTypeOrmRepository(
              dataSource.getRepository(BankAccountSchema),
            );
          },
          inject: [getDataSourceToken()],
        },
        {
          provide: BankAccountService,
          useFactory: (repo: BankAccountRepository) => {
            return new BankAccountService(repo);
          },
          inject: [BankAccountTypeOrmRepository],
        },
      ],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
