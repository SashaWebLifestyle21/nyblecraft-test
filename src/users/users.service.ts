import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilesService, FileType } from "../files/files.service";
import { PdfService } from "../pdf/pdf.service";
import * as fs from 'fs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private filesService: FilesService,
              private pdfService: PdfService) {}

  async createUser(dto: CreateUserDto, img) {
    const imagePath = await this.filesService.createFile(FileType.IMAGE, img)
    const user = await this.userRepository.create({...dto, image: imagePath })
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll()
    return users
  }

  async getByEmail(email: string) {
      const user = await this.userRepository.findOne({where: { email } })
      return user
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.destroy({ where: { id } })
    return !!user

  }

  async updateUser(dto: UpdateUserDto) {
    const user = await this.userRepository.update(
      {
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName
      },
      {
        where: { id: dto.id }
      }
    )
    return user
  }

  async createPDFofUser(email: string) {
    const user = await this.getByEmail(email)

    if(user.pdf) {
      return false
    }

    const pdf = await this.pdfService.createPDFUser({
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image
    })


    const binaryString = fs.readFileSync(pdf, { encoding: 'binary' })
    const pdfBinary = Buffer.from(binaryString, "binary");

    const updatedUser = await this.userRepository.update(
      {
        // @ts-ignore
        pdf: pdfBinary
      },
      {
        where: { email: user.email }
      }
    )

    return JSON.stringify(!!updatedUser)
  }
}
