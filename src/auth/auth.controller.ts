import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ValidationPipe } from "../pipes/validation.pipe";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  registration(@Body() userDto: CreateUserDto,  @UploadedFile() image) {
      return this.authService.registration(userDto, image)
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto)
  }

}
