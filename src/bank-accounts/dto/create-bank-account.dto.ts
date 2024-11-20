export class CreateBankAccountDto {
  account_name: string;
  account_type: string;
  account_description: string;
  initial_amount: number;
  created_at: Date;
  updated_at: Date;
}
