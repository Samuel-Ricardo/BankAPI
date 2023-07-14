import { BankAccount } from '../../domain/bank-account';
import { BankAccountRepository } from '../../domain/bank-account.repository';
import { Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(
      bankAccount as unknown as BankAccountSchema,
    );
    await this.ormRepo.insert(model);
  }
  update(bankAccount: BankAccount): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    throw new Error('Method not implemented.');
  }
}
