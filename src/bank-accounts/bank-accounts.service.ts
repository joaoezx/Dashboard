import { Injectable } from '@nestjs/common';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    // permite realizar operações no db
  ) {}

  async create(dto: CreateBankAccountDto) {
    const bankAccount = this.bankAccountRepository.create(dto);
    return await this.bankAccountRepository.save(bankAccount);
  }

  findAll() {
    return this.bankAccountRepository.find();
  }

  findOne(id: string) {
    return this.bankAccountRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateBankAccountDto) {
    await this.bankAccountRepository.update({ id }, updateDto);

    return this.bankAccountRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    await this.bankAccountRepository.delete(id);

    return this.bankAccountRepository.findOne({
      where: { id },
    });
  }
}
