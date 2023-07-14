import { v4 as uuid } from 'uuid';

export class BankAccount {
  constructor(
    private balance: number,
    private account_number: string,
    private id?: string,
  ) {
    this.id = id ?? uuid();
  }

  debit(amount: number) {
    this.balance -= amount;
  }

  credit(amount: number) {
    this.balance += amount;
  }

  getId() {
    return this.id;
  }
  getBalance() {
    return this.balance;
  }
  getAccountNumber() {
    return this.account_number;
  }
}
