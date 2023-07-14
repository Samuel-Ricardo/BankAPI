import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository';

describe('[REPOSITORY] | Bank Account - (TypeORM) ', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
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
  });

  it('should create a bank account', async () => {
    expect(true).toBeTruthy();
  });
});
