import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { DataSource } from 'typeorm';
import { BankAccountRepository } from '..//@core/domain/bank-account.repository';
import { BankAccountService } from '../@core/domain/bank-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BankAccountsModule {}
