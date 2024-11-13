import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column()
  account_name: string;

  @Column()
  account_type: string;

  @Column()
  account_description: string;

  @Column()
  initial_ammount: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
