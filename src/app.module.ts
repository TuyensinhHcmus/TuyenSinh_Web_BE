import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

/* eslint-disable */
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesModule } from './faculties/faculties.module';
import { UsersModule } from './users/users.module';
import { AdmissionGroupsModule } from './admissionGroups/admissionGroups.module';
import { AuthModule } from './auth/auth.module';
import { MethodsModule } from './methods/methods.module';
import { MajorsModule } from './majors/majors.module';
import { ResQuestionsModule } from './res-questions/res-questions.module';
import { NewsAdmissionModule } from './news-admission/news-admission.module';
import { ProgramsModule } from './programs/programs.module';
import { TuitionsModule } from './tuitions/tuitions.module';

@Module({  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_HOST
    ),
    FacultiesModule,
    NewsAdmissionModule,
    ResQuestionsModule,
    UsersModule,
    AdmissionGroupsModule,
    AuthModule,
    MethodsModule,
    MajorsModule,
    ProgramsModule,
    TuitionsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
