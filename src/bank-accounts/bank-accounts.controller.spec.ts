import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

describe('BankAccountsController', () => {
  let controller: BankAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountsController],
      providers: [BankAccountsService],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
  });

  const newAccount: CreateBankAccountDto = {
    account_name: 'Caixinha',
    account_type: 'Poupanca',
    account_description: 'Conta poupanca',
    initial_amount: 1000,
  };

  it('should be create a new user', async () => {});
});
