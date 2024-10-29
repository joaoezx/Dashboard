import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users = []
  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findOrder(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  findOne(id: string) {
  const user = this.users.find((user) => user.id === id);
    return { user };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return console.log(updateUserDto), `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a ${id} user`;
  }
}
