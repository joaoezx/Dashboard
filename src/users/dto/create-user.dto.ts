import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString() // Verifica se é uma string
  name: string;

  @IsEmail() // Verifica se o email é válido
  email: string;

  @IsString() // Verifica se é uma string
  @MinLength(8) // Mínimo de 8 caracteres
  @MaxLength(16) // Máximo de 16 caracteres
  password: string;
}
