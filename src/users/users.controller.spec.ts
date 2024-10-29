import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a user id', async () => {
    const result = await controller.findOne('1');
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
    });
  });
  it('should return full name', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const result = await controller.findOrder(firstName, lastName);
    expect(result).toBeDefined();
    expect(result).toBe('John Doe');
  });
  it('should create a user', async () => {
    const result = await controller.create({
      firstName: 'John',
      lastName: 'Doe',
      created_at: new Date(),
      updated_at: new Date(),
      birthDate: '10/10/1010',
    });
    expect(result).toBeDefined();
    expect(result).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      created_at: new Date(),
      updated_at: new Date(),
      birthDate: '10/10/1010',
    });
  });
  it('should update a user', async () => {
    const result = await controller.update('1', {
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      firstfirstName: 'John',
      lastName: 'Doe',
    });
  });
  it('should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});
