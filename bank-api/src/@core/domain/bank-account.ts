import { v4 as uuid } from 'typeorm/driver/mongodb/bson.typings';

export class BankAccount {
  constructor(
    private balance: number,
    private account_number: string,
    private id?: string,
  ) {
    this.id = id ?? uuid();
  }
}
