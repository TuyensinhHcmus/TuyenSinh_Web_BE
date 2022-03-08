import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* eslint-disable */
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesModule } from './faculties/faculties.module';
import { UsersModule } from './users/users.module';
import { AdmissionGroupsModule } from './admissionGroups/admissionGroups.module';

@Module({  imports: [
    AdmissionGroupsModule,
    MongooseModule.forRoot(
      'mongodb+srv://tuyensinhhcmus:Y64oNI6ptREGRyN6@tuyensinhhcmus.2t0eq.mongodb.net/TuyenSinhHCMUS'
    ),
    FacultiesModule,
    UsersModule,
    AdmissionGroupsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
