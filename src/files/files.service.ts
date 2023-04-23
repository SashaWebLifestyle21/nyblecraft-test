import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


export enum FileType {
  PDF = 'PDF',
  IMAGE = 'image'
}

@Injectable()
export class FilesService {
  async createFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop()
      const fileName = uuid.v4() + '.' + fileExtension
      const filePath = path.resolve(__dirname, '..', 'static', type)
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
      return type + '/' + fileName
    } catch (e) {
      throw new HttpException('Произошла ошибка при создании файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
