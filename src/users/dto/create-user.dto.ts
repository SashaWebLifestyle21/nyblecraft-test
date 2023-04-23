import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string

  @Length(6, 6, { message: 'Пароль должен быть 6 символов' })
  readonly password: string

  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string

  @IsString({ message: 'фамилия должна быть строкой' })
  readonly lastName: string
}