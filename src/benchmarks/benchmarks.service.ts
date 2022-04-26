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

  async getBenchmarksByYear(year: string): Promise<any[]> {
    const benchmarks = await this.benchmarksRepo.find({
      select: ["benchmarkMajorId", "benchmarkScore"],
      where: { benchmarkYear: parseInt(year) }
    })

    return benchmarks;
  }

  async updateBenchmark(id: string, updateBenchmarkDto: UpdateBenchmarkDto): Promise<benchmark> {

    const { benchmarkMajorId, benchmarkYear, benchmarkScore } = updateBenchmarkDto;

    const benchmark = await this.findBenchmark(id);

    benchmark.benchmarkMajorId = benchmarkMajorId;
    benchmark.benchmarkYear = benchmarkYear;
    benchmark.benchmarkScore = benchmarkScore;
   
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
