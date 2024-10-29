import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users = [];
  create(newUser: CreateUserDto) {
    const user = {
      id: String(Math.random()).split('0.')[1],
      ...newUser,
    };
    this.users.push(user);
    return user;
  }

  findOrder(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return console.log(updateUserDto), `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a ${id} user`;
  }
}
