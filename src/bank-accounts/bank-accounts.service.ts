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
    const newAccount = this.bankAccountRepository.create(dto);
    return await this.bankAccountRepository.save(newAccount);
  }

  findAll() {
    return this.bankAccountRepository.find();
  }

  findOne(user_id: string) {
    return this.bankAccountRepository.findOne({
      where: { user_id },
    });
  }

  async patch(user_id: string, updateDto: UpdateBankAccountDto) {
    await this.bankAccountRepository.update(user_id, updateDto);

    return this.bankAccountRepository.findOne({
      where: { user_id },
    });
  }

  async remove(user_id: string) {
    await this.bankAccountRepository.delete(user_id);

    return this.bankAccountRepository.findOne({
      where: { user_id },
    });
  }
}
