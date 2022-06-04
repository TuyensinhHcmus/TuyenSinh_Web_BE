import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
//import { ConfigService } from "@nestjs/config";
import { join } from 'path';
import { GenPdfController } from './generatePdf.controller';
import { PdfService } from './generatePdf.service';

@Global() // 👈 global module
@Module({
  // imports: [
  //   MailerModule.forRootAsync({
  //     useFactory: async () => ({
  //       transport: {
  //         host: process.env.MAIL_HOST,
  //         secure: false,
  //         auth: {
  //           user: process.env.MAIL_USER,
  //           pass: process.env.MAIL_PASSWORD
  //         },
  //       },
  //       defaults: {
  //         from: `"No Reply" <${process.env.MAIL_FROM}>`,
  //       },
  //       template: {
  //         dir: join(__dirname, 'templates'),
  //         adapter: new HandlebarsAdapter(),
  //         options: {
  //           strict: true,
  //         },
  //       },
  //     }),
  //     //inject: [ConfigService],
  //   }),
  // ],
  providers: [PdfService],
  controllers: [GenPdfController],
  exports: [PdfService],
})
export class PdfModule {}
