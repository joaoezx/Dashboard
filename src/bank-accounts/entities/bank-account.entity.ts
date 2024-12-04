import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 100 })
  account_name: string;

  @Column('varchar', { length: 100 })
  account_type: string;

  @Column('varchar', { length: 200 })
  account_description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  initial_amount: number;

  @OneToMany(() => Transaction, transaction => transaction.bankAccount)
  transactions: Transaction[];
}
