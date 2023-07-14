import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountRepository } from '../../domain/bank-account.repository';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(bankAccount: BankAccount): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    throw new Error('Method not implemented.');
  }
}
