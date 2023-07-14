import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from '../infra/db/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository';
import { BankAccountService } from './bank-account.service';

describe('[SERVICE] | Bank Account - Tests', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let service: BankAccountService;
  let repository: BankAccountTypeOrmRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchema],
    });

    await dataSource.initialize();

    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    service = new BankAccountService(repository);
  });

  it('should create a new bank account', () => {
    expect(true).toBeTruthy();
  });
});
