import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile, UseGuards,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePdfUserDto } from "./dto/create-pdf-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() userDto: CreateUserDto, @UploadedFile() image) {
    return this.usersService.createUser(userDto, image)
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id)
  }

  @Put()
  update(@Body() userDto: UpdateUserDto) {
    return this.usersService.updateUser(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/createPDF')
  @UseInterceptors(FileInterceptor('PDF'))
  createPDFofUser(@Body() dto: CreatePdfUserDto) {
    return this.usersService.createPDFofUser(dto.email)
  }

}
