import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddBenchmarkDto } from './dto/add-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';
import { benchmark } from './benchmark.entity';

@Injectable()
export class BenchmarksService {
  constructor(
    @InjectRepository(benchmark)
    private readonly benchmarksRepo: Repository<benchmark>,
  ) {}

  async getBenchmarks(): Promise<benchmark []> {
    const benchmarks = await this.benchmarksRepo.find({});
    return benchmarks;
  }

  async updateBenchmark(id: string, updateBenchmarkDto: UpdateBenchmarkDto): Promise<benchmark> {

    const { benchmarkImage } = updateBenchmarkDto;

    const benchmark = await this.findBenchmark(id);

    benchmark.benchmarkImage = benchmarkImage;
   
    await this.benchmarksRepo.update({benchmarkId: parseInt(id)}, benchmark);

    return benchmark;
  }

  private async findBenchmark(id: string): Promise<benchmark> {
    let benchmark;

    try {
      benchmark = await this.benchmarksRepo.findOne({benchmarkId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find benchmark.');
    }

    if (!benchmark) {
      throw new NotFoundException('Could not find benchmark.');
    }

    return benchmark;
  }
}
