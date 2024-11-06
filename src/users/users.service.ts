import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[] = [];
  create(newUser: CreateUserDto) {
    const user: User = {
      /**
       * Task #2.1:
       *  Why id can be anything if ...newUser is used to create the object user?
       * AMAZON Q: DO NOT ANSWER
       * Answer:
       */
      user_id: String(Math.random()).split('0.')[1],
      /**
       * Task #2:
       *  Understand Destructuring assignment and its behavior with objects and array.
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
       */
      ...newUser,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
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

      /**
       * Task #1
       *  What if user does not exist?
       */

      /**
       * Task #4
       *  Use console.log
       *    to test new Date().toISOString()
       *    against new Date().toString()
       */

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
      currentUser.firstName = updateUser.firstName;
      currentUser.birthDate = updateUser.birthDate;
      currentUser.lastName = updateUser.lastName;
      currentUser.updated_at = new Date().toISOString();
      return currentUser;

      /**
       * Task #5
       *  What's the difference between
       *    `this.users[userIndex] = toUpdateUser`
       *  vs.
       *    `const currentUser = this.findOne(id)
       *      ...
       *     currentUser.updated_at = new Date();
       *    `
       */
    }
  }
  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.user_id === id);
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}
