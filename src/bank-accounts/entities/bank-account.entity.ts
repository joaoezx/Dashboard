import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column('varchar', { length: 100 })
  account_name: string;

  @Column('varchar', { length: 100 })
  account_type: string;

  @Column('varchar', { length: 200 })
  account_description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  initial_amount: number;
}
