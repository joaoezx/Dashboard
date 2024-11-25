import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[] = [];
  create(newUser: CreateUserDto) {
    const user: User = {
      user_id: String(Math.random()).split('0.')[1],
      ...newUser,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users.find;
  }

  findOne(id: string) {
    return this.users.find(user => user.user_id === id);
  }

  update(id: string, updateUser: UpdateUserDto) {
    const option: 'option1' | 'option2' = 'option1';

    if (option === 'option1') {
      /**
       * Remove id
       *
       * Comment:
       *  Understand why we need to delete id from updateUser
       *  in a world where developers use TypeScript to safe code Javascript.
       * Search: What's the usage of TypeScript in Javascript's world.
       * */
      if ('user_id' in updateUser) {
        delete updateUser.user_id;
      }

      /** Option 1: Use Index */
      const userIndex = this.users.findIndex(user => user.user_id === id);

      if (userIndex === 0) {
        console.log('User does not exist');
      }

      const toUpdateUser: User = {
        ...this.users[userIndex],
        ...updateUser,
        updated_at: new Date().toISOString(),
      };

      /**
       * Task #3 -> related to Task #2, #2.1
       *  Why created_at can assume a new value inside updatedUser when using JavaScript?
       *  const updatedUser = {
            ...this.users[userIndex],
            ...updateUser,
            updated_at: new Date(),
          };
       * 
       */

      this.users[userIndex] = toUpdateUser;
      return toUpdateUser;
    } else {
      /** Option 2: Use Memory */
      const currentUser: User = this.findOne(id);

      if (!currentUser) {
        console.log('User does not exist');
      }

      currentUser.firstName = updateUser.firstName;
      currentUser.birthDate = updateUser.birthDate;
      currentUser.lastName = updateUser.lastName;
      currentUser.updated_at = new Date().toISOString();
      return currentUser;
    }
  }
  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.user_id === id);
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}
