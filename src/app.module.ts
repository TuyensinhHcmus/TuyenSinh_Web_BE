import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

/* eslint-disable */
import { FacultiesModule } from './faculties/faculties.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MethodsModule } from './methods/methods.module';
import { MajorsModule } from './majors/majors.module';
import { ProgramsModule } from './programs/programs.module';
import { ResQuestionsModule } from './resQuestions/resQuestions.module';
import { NewsAdmissionModule } from './newsAdmission/newsAdmission.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolInfoModule } from './schoolInfo/schoolInfo.module';
import { TimelineModule } from './timeline/timeline.module';




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
    FacultiesModule,
    NewsAdmissionModule,
    TimelineModule,
    ResQuestionsModule,
    UsersModule,
    AuthModule,
    MethodsModule,
    MajorsModule,
    ProgramsModule,
    SchoolInfoModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
