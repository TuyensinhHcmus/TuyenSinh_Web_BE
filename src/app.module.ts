import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

/* eslint-disable */
// import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesModule } from './faculties/faculties.module';
// import { UsersModule } from './users/users.module';
import { AdmissionGroupsModule } from './admissionGroups/admissionGroups.module';
// import { AuthModule } from './auth/auth.module';
import { MethodsModule } from './methods/methods.module';
import { MajorsModule } from './majors/majors.module';
// import { ProgramsModule } from './programs/programs.module';
// import { TuitionsModule } from './tuitions/tuitions.module';
// import { ResQuestionsModule } from './resQuestions/resQuestions.module';
// import { NewsAdmissionModule } from './newsAdmission/newsAdmission.module';
// import Joi from '@hapi/joi';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faculty } from './faculties/faculty.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-05.cleardb.net',
      port: 3306,
      username: 'b2e06d331c6a45',
      password: 'f0f9c5af',
      database: 'heroku_9c18382388ad366',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    FacultiesModule,
    // NewsAdmissionModule,
    // ResQuestionsModule,
    // UsersModule,
    AdmissionGroupsModule,
    // AuthModule,
    MethodsModule,
    MajorsModule,
    // ProgramsModule,
    // TuitionsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
