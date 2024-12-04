import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async getAccountBalance(accountId: string) {
    const transactions = await this.transactionRepository.find({
      where: { account_id: accountId },
    });

    const balance = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + transaction.value;
      } else {
        return total - transaction.value;
      }
    }, 0);

    return balance;
  }

  async createTransaction(dto: CreateTransactionDto) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id: dto.account_id },
      relations: ['transactions'],
    });

    if (!bankAccount) {
      throw new Error('Conta bancária não encontrada');
    }

    if (dto.type === 'outcome' && bankAccount.initial_amount < dto.value) {
      throw new Error('Saldo insuficiente para realizar a transação');
    }

    const transaction = this.transactionRepository.create({
      ...dto,
      status: 'pending',
      bankAccount,
    });

    return await this.transactionRepository.save(transaction);
  }

  async confirmTransaction(transactionId: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });
    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    transaction.status = 'confirmed';
    return await this.transactionRepository.save(transaction);
  }
  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
