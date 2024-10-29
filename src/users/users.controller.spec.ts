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
  it('should create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      created_at: new Date(2024, 0, 1),
      updated_at: new Date(2024, 0, 1),
      birthDate: '10/10/1010',
    };

    // Criou usuário, incrementando o id
    const createdUser = await controller.create(newUser);

    // Comparando createUser com o user do db
    expect(createdUser).toEqual({
      id: expect.any(String),
      ...newUser,
    });

    // Buscando usuário
    const foundUser = await controller.findOne(createdUser.id);
    console.log(foundUser);
    expect(foundUser).toEqual(createdUser);
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
