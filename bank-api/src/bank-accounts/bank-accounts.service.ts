import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { Repository, DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { throws } from 'assert';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccountSchema)
    private repository: Repository<BankAccountSchema>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const account = this.repository.create({
      account_number: createBankAccountDto.account_number,
      balance: 0,
    });

    await this.repository.insert(account);
    return account;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async transfer({ from, to, amount }: TransferBankAccountDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      const fromAccount = await this.repository.findOneBy({
        account_number: from,
      });
      const toAccount = await this.repository.findOneBy({
        account_number: to,
      });

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      this.repository.save(fromAccount);
      this.repository.save(toAccount);

      await queryRunner.commitTransaction();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
