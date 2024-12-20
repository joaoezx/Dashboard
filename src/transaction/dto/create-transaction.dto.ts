import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsIn,
  IsString,
  Length,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @IsPositive({ message: 'O valor deve ser maior que zero.' })
  value: number;

  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsIn(['income', 'outcome'], {
    message: 'O tipo deve ser income ou outcome.',
  })
  type: string;

  @IsNotEmpty({ message: 'O account_id é obrigatório.' })
  @IsString({ message: 'O account_id deve ser uma string.' })
  account_id: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @Length(0, 200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  description?: string;
}
