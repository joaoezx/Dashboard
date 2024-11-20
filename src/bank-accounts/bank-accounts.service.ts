import { Injectable } from '@nestjs/common';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    // permite realizar operações no db relacionado a entidade
  ) {}

  async create(data: Partial<BankAccount>) {
    // permite que seja enviada uma parte parcial dos dados
    const newRecord = this.bankAccountRepository.create(data);
    return await this.bankAccountRepository.save(newRecord);
  }

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${updateBankAccountDto} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
