import { BankAccount } from './bank-account';

export class TransferService {
  async transfer(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.credit(amount);
    bankAccountDest.debit(amount);
  }
}
