import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolInfoController } from './schoolInfo.controller';
import { schoolinfo } from './schoolInfo.entity';
import { SchoolInfoService } from './schoolInfo.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([schoolinfo]),
  ],
  providers: [SchoolInfoService],
  controllers: [SchoolInfoController]
})
export class SchoolInfoModule {}
