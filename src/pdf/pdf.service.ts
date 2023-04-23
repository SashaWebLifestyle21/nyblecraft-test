import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
import { CreatePdfUserDto } from "./dto/create-pdf-user.dto";
import axios from "axios";
const PDFDocument = require('pdfkit');

@Injectable()
export class PdfService {
  async createPDFUser(dto: CreatePdfUserDto){
    const doc = new PDFDocument();
    const fileName = uuid.v4() + '.' + 'pdf'
    const filePath = path.resolve(__dirname, '..', 'static', 'PDF')
    if(!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    doc.pipe(fs.createWriteStream(filePath + '/' + fileName))

    doc.font('Times-Roman')
      .fontSize(20)
      .text('FirstName: ' +dto.firstName);

    doc.font('Times-Roman')
      .fontSize(20)
      .text('LastName: ' + dto.lastName);

    const img = await this.fetchImage('http://localhost:5000/' + dto.image)

    doc.image(img, { width: 300 });

    doc.end();

    await this.fetchPDF('http://localhost:5000/PDF/' + fileName)
    return filePath + '/' + fileName
  }


  async fetchImage(url: string) {
    const image = await axios
      .get(url, {
        responseType: 'arraybuffer'
      })
    return image.data;
  }

  async fetchPDF(url: string) {
    const pdf = await axios
      .get(url, {
        responseType: 'arraybuffer'
      })
    return pdf;
  }
}
