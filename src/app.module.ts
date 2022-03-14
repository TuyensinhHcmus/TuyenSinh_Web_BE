import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

/* eslint-disable */
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesModule } from './faculties/faculties.module';
import { UsersModule } from './users/users.module';
import { AdmissionGroupsModule } from './admissionGroups/admissionGroups.module';
import {AuthModule} from './auth/auth.module';


@Module({  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_HOST
    ),
    FacultiesModule,
    UsersModule,
    AdmissionGroupsModule,
    AuthModule
    
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
