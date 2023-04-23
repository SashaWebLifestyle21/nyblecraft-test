import { IsEmail, IsString } from "class-validator";

export class CreatePdfUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string

  @IsString({ message: 'фамилия должна быть строкой' })
  readonly lastName: string

  readonly image: string
}