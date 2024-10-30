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

  findAll(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  update(id: string, updateUser: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === id);

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUser,
      updated_at: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  remove(id: string) {
    return `This action removes a ${id} user`;
  }
}
