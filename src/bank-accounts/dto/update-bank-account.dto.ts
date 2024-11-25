import { PartialType } from '@nestjs/mapped-types';
import { CreateBankAccountDto } from './create-bank-account.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
  account_description: string;
}
