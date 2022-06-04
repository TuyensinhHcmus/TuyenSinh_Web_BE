import { Controller, Get, Res, Response, StreamableFile } from '@nestjs/common';
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

    // @Get('/tuihoso')
    // async genTuiHoSo()  {
    //   const file = await this.pdfService.generatePdf();
    //   return file;
    // }


    //v1
    @Get('/tuihoso')
    async genTuiHoSo(@Response({ passthrough: true }) res)  {
      const file = await this.pdfService.generatePdf();
      // const file = createReadStream(join(process.cwd(), 'pdfname.pdf'));
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="pdfname.pdf"',
      });
      return new StreamableFile(file);
    }
  }