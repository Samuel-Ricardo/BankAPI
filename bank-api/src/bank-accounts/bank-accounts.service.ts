import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { Repository, DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';

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

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
