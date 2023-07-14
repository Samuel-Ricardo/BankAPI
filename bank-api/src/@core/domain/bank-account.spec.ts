import { BankAccount } from './bank-account';

describe('[DOMAIN] | Bank Account - Unit Tests', () => {
  it('should create a bank account', () => {
    const bankAccount = new BankAccount(100, '123', '12345');

    expect(bankAccount).toBeDefined();

    expect(bankAccount.getBalance()).toBe(100);
    expect(bankAccount.getAccountNumber()).toBe('123');
    expect(bankAccount.getId()).toBe('12345');
  });

  it('should debit a bank account', () => {
    const bankAccount = new BankAccount(100, '123', '12345');
    bankAccount.debit(50);

    expect(bankAccount.getBalance()).toBe(50);
  });

  it('should credit a bank account', () => {
    const bankAccount = new BankAccount(100, '123', '12345');
    bankAccount.credit(50);

    expect(bankAccount.getBalance()).toBe(150);
  });
});
