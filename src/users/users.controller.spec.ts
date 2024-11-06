import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // const newUser: CreateUserDto = {
  const newUser: CreateUserDto = {
    firstName: 'John',
    lastName: 'Doe',
    created_at: new Date(2024, 0, 1),
    updated_at: new Date(2024, 0, 1),
    birthDate: '10/10/1010',
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
  });

  it('should create a new user', async () => {
    // incrementando o id
    const createdUser = await controller.create(newUser);

    // Comparando createUser com o user do db
    expect(createdUser.user_id).toBeDefined();
    /** Task #6
     *  Difference between Jest toEqual vs toMatchObject
     */
    expect(createdUser).toMatchObject(newUser);

    // Buscando usuário
    const foundUser = await controller.findOne(createdUser.user_id);

    expect(foundUser.user_id).toEqual(createdUser.user_id);
  });

  it('should update a user', async () => {
    // incrementando o id
    const createdUser = await controller.create(newUser);

    // novos dados injetados no usuário
    const updateUser: UpdateUserDto = {
      // @ts-expect-error Test if id is removed
      user_id: '1',
      lastName: 'Smith',
    };

    // localizando o usuário pelo id e fazendo o uptade
    const updatedUser = await controller.update(
      createdUser.user_id,
      updateUser,
    );

    /** confere se o id é o mesmo */
    expect(updatedUser.user_id).toEqual(createdUser.user_id);

    // comparando se os dados atualizados estão corretos
    expect(updatedUser).toMatchObject({
      firstName: 'John',
      lastName: 'Smith',
      birthDate: '10/10/1010',
    });

    expect(updatedUser.created_at).toEqual(createdUser.created_at);
    expect(updatedUser.updated_at).not.toEqual(createdUser.updated_at);

    const foundUser = await controller.findOne(createdUser.user_id);

    // comparando o usuário do banco de dados
    expect(foundUser).toEqual(updatedUser);
  });

  it('should not allow to update a user that does not exists', async () => {
    const user_id = '999';
    const updateUser: UpdateUserDto = {
      // @ts-expect-error Test if id is removed
      user_id: user_id,
      lastName: 'Smith',
    };

    const updatedUser = await controller.update(user_id, updateUser);
    /**
     * Check for throw new Error()
     */
    expect(updatedUser).rejects.toEqual({
      error: 'User does not exists or you are not allowed to do this operation',
    });
  });

  it('should remove a user', async () => {
    const createdUser = await controller.create(newUser);

    // Comparando createUser com o user do db
    expect(createdUser).toEqual({
      user_id: createdUser.user_id,
      ...newUser,
    });

    //deletando usuário
    await controller.remove(createdUser.user_id);

    // buscando usuário deletado
    const foundUser = await controller.findOne(createdUser.user_id);

    expect(foundUser).toBeUndefined();
  });
});
