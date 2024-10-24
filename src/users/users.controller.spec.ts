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
  it('should return a user', async () => {
    const result = await controller.findOne('1');
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
  it('should create a user', async () => {
    const result = await controller.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'XXXXXXXX',
    });
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
  it('should update a user', async () => {
    const result = await controller.update('1', {
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
  it('should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
