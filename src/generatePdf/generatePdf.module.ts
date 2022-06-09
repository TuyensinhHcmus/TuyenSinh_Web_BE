import { Module } from '@nestjs/common';
//import { ConfigService } from "@nestjs/config";
import { AdmissionNotificationsModule } from 'src/admissionNotifications/admissionNotifications.module';
import { GenPdfController } from './generatePdf.controller';
import { PdfService } from './generatePdf.service';

@Module({

  imports: [
    AdmissionNotificationsModule
  ],
  controllers: [GenPdfController],
  providers: [PdfService]
})
export class PdfModule {}
