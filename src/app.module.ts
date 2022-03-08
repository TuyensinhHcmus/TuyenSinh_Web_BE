import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesModule } from './faculties/faculties.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tuyensinhhcmus:Y64oNI6ptREGRyN6@tuyensinhhcmus.2t0eq.mongodb.net/TuyenSinhHCMUS'
    ),
    FacultiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
