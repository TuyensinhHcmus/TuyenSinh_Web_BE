import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cv } from './cv.entity';
import { CvsService } from './cv.service';
import { CvsController } from './cv.controller';
import { AspirationModule } from 'src/aspiration/aspiration.module';
import { CvaisModule } from 'src/cvapplyinformation/cvapplyinformation.module';
import { UsersModule } from 'src/users/users.module';
import { PdfModule } from 'src/generatePdf/generatePdf.module';
import { MailModule } from 'src/mail/mail.module';
import { MajorsModule } from 'src/majors/majors.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([cv]),
    AspirationModule,
    CvaisModule,
    UsersModule,
    CvaisModule,
    PdfModule,
    MailModule,
    MajorsModule
  ],
  
  controllers: [CvsController],
  providers: [CvsService],
  exports: [CvsService]
})

export class CvsModule {}