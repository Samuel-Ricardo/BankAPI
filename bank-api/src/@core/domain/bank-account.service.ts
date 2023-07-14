import { BankAccount } from './bank-account';
import { BankAccountRepository } from './bank-account.repository';

export class BankAccountService {
  constructor(private bankAccountRepository: BankAccountRepository) {}

  async create(accountNumber: string) {
    const bankAccount = new BankAccount(0, accountNumber);
    await this.bankAccountRepository.insert(bankAccount);

    return bankAccount;
  }
}
