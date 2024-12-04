import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsIn,
  IsString,
  IsOptional,
  Length,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @IsPositive({ message: 'O valor deve ser maior que zero.' })
  value: number;

  @Column('varchar')
  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsIn(['income', 'outcome'], {
    message: 'O tipo deve ser income ou outcome.',
  })
  type: string;

  @Column('varchar')
  @IsNotEmpty({ message: 'O user_id é obrigatório.' })
  @IsString({ message: 'O user_id deve ser uma string.' })
  user_id: string;

  @Column('varchar')
  @IsNotEmpty({ message: 'O account_id é obrigatório.' })
  @IsString({ message: 'O account_id deve ser uma string.' })
  account_id: string;

  @Column('varchar')
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsIn(['pending', 'confirmed', 'reimbursed'], {
    message: 'O status deve ser pending, confirmed ou reimbursed.',
  })
  status: string;

  @Column('text', { nullable: true })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  @Length(0, 200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => BankAccount, bankAccount => bankAccount.transactions)
  bankAccount: BankAccount;
}
