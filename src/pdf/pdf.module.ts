import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [HttpModule]
})
export class PdfModule {}
