import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository';
import { BankAccount } from '../../domain/bank-account';

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

  it('should insert a new bank account', async () => {
    const bankAccount = new BankAccount(100, '111-11', '123');
    await repository.insert(bankAccount);

    const model = await ormRepo.findOneBy({ account_number: '111-11' });

    expect(model).toBeDefined();

    expect(model.id).toBe('123');
    expect(model.balance).toBe(100);
    expect(model.account_number).toBe('111-11');
  });
});
