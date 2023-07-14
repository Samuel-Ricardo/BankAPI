import { BankAccount } from '../../domain/bank-account';
import { BankAccountRepository } from '../../domain/bank-account.repository';
import { Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create({ ...bankAccount });
    await this.ormRepo.insert(model);
  }
  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.getId(), {
      balance: bankAccount.getBalance(),
    });
  }
  findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    throw new Error('Method not implemented.');
  }
}
