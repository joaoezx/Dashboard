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
  initial_amount: number;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
