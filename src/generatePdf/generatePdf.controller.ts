import { Controller, Get, Param, Res, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PdfService } from './generatePdf.service';
  
  @Controller('genpdf')
  export class GenPdfController {
    constructor(private readonly pdfService: PdfService) {}
  
    // @Get('/tuihoso')
    // async genTuiHoSo()  {
    //   const file = await this.pdfService.generatePdf();
    //   return file;
    // }

    @Get('/tuihoso')
    async saveFirebase()  {
      const data = await this.pdfService.generatePdf();
      return data
    }


    //v1
    @Get('/getpdf/:id')
    async genTuiHoSo(@Response({ passthrough: true }) res, @Param('id') filename:string)  {
      const file = await this.pdfService.getPDF(filename);
      // const file = createReadStream(join(process.cwd(), 'pdfname.pdf'));
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="pdfname.pdf"',
      });
      return new StreamableFile(file);
    }
  }