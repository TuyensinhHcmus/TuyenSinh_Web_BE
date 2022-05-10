import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cv } from './cv.entity';
import { CvsService } from './cv.service';
import { CvsController } from './cv.controller';
import { AspirationModule } from 'src/aspiration/aspiration.module';
import { CvaisModule } from 'src/cvapplyinformation/cvapplyinformation.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([cv]),
    AspirationModule,
    CvaisModule,
    UsersModule,
    CvaisModule
  ],
  
  controllers: [CvsController],
  providers: [CvsService],
})

export class CvsModule {}