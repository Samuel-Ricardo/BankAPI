import { BankAccount } from './bank-account';

export class TransferSerfice {
  async transfer(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.credit(amount);
    bankAccountDest.debit(amount);
  }
}
