import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async registration(userDto: CreateUserDto, image: string) {
    const candidate = await this.userService.getByEmail(userDto.email)
    if(candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 6)
    const user = await this.userService.createUser({...userDto, password: hashPassword}, image)
    return this.generateToken(user)
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getByEmail(userDto.email)
    if(!user) {
      throw new UnauthorizedException({ message: 'Некорректный email' })
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if(!passwordEquals) {
      throw new UnauthorizedException({ message: 'Некорректный пароль' })
    }
    if(user && passwordEquals) {
      return user
    }
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
