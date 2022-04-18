import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BenchmarksService } from './benchmarks.service';
import { BenchmarksController } from './benchmarks.controller'
import { benchmark } from './benchmark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([benchmark])
  ],
  controllers: [BenchmarksController],
  providers: [BenchmarksService],
})

export class BenchmarksModule {}