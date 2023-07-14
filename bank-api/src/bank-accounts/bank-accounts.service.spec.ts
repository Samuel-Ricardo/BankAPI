import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountRepository } from '../@core/domain/bank-account.repository';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';

describe('BankAccountsService', () => {
  let service: BankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BankAccountsService>(BankAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
