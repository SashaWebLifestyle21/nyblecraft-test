export class UpdateUserDto {
  id: number
  readonly email: string
  readonly password: string
  readonly firstName: string
  readonly lastName: string
}