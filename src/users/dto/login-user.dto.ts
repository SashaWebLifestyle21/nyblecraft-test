import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
  @IsString({ message: 'email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string

  @Length(6, 6, { message: 'Пароль должен быть 6 символов' })
  readonly password: string
}