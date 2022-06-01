import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* eslint-disable */
import { FacultiesModule } from './faculties/faculties.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MethodsModule } from './methods/methods.module';
import { MajorsModule } from './majors/majors.module';
import { ProgramsModule } from './programs/programs.module';
import { ResQuestionsModule } from './resQuestions/resQuestions.module';
import { NewsAdmissionModule } from './newsAdmission/newsAdmission.module';
import { SchoolInfoModule } from './schoolInfo/schoolInfo.module';
import { TimelineModule } from './timeline/timeline.module';
import { UnVerifyUsersModule } from './unverifyuser/unverifyuser.module';
import { TypeOfTrainingModule } from './typeOfTraining/typeOfTraining.module';
import { ContactsModule } from './contacts/contacts.module';
import { TuitionsModule } from './tuitions/tuitions.module';
import { BenchmarksModule } from './benchmarks/benchmarks.module';
import { TypeProgramsModule } from './typePrograms/typePrograms.module';
import { DocumentsModule } from './documents/documents.module';
import { AdmissionProcessModule } from './admissionProcess/admissionProcess.module';
import { CvsModule } from './cv/cv.module';
import { InforCandidatesModule } from './informationcandidate/inforcandidate.module';
import { AdmissionNotificationsModule } from './admissionNotifications/admissionNotifications.module';
import { ResultModule } from './result/result.module';
import { ImageModule } from './imageData/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username:  process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ResultModule,
    FacultiesModule,
    NewsAdmissionModule,
    TimelineModule,
    ResQuestionsModule,
    UsersModule,
    TypeOfTrainingModule,
    AuthModule,
    MethodsModule,
    MajorsModule,
    ProgramsModule,
    SchoolInfoModule,
    ContactsModule,
    UnVerifyUsersModule,
    TuitionsModule,
    BenchmarksModule,
    TypeProgramsModule,
    DocumentsModule,
    AdmissionProcessModule,
    CvsModule,
    InforCandidatesModule,
    AdmissionNotificationsModule,
    ImageModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
