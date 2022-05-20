import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  providers: [ResultService],
  controllers: [ResultController]
})
export class ResultModule {}
