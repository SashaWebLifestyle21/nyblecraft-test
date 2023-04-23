import { IsEmail, IsString, Length } from "class-validator";

export class CreatePdfUserDto {
  @IsString({ message: 'email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string
}