import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

  async getBenchmarks(): Promise<benchmark[]> {
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

  async addBenchmark(addBenchmarkDto: AddBenchmarkDto): Promise<benchmark> {

    const {benchmarkMajorId, benchmarkYear, benchmarkScore, benchmarkMethodId } = addBenchmarkDto;

    const benchmark = await this.benchmarksRepo.create({
      benchmarkMajorId: benchmarkMajorId,
      benchmarkYear: benchmarkYear,
      benchmarkScore: benchmarkScore,
      benchmarkMethodId: benchmarkMethodId
    })

    try {
      await this.benchmarksRepo.save(benchmark);
      return benchmark;
    } catch (error) {
      throw new HttpException("Không thể thêm điểm chuẩn thành công", HttpStatus.BAD_REQUEST);
    }
  }

  async updateBenchmark(benchmarkId, updateBenchmarkDto: UpdateBenchmarkDto): Promise<benchmark> {

    console.log(updateBenchmarkDto);
    const { benchmarkMajorId, benchmarkYear, benchmarkScore, benchmarkMethodId } = updateBenchmarkDto;

    let benchmark = await this.findBenchmark(benchmarkId);

    benchmark.benchmarkMajorId = benchmarkMajorId;
    benchmark.benchmarkYear = benchmarkYear;
    benchmark.benchmarkScore = benchmarkScore;
    benchmark.benchmarkMethodId = benchmarkMethodId;

    try {
      await this.benchmarksRepo.update({ benchmarkId: benchmarkId }, benchmark);
      return benchmark;
    } catch (error) {
      throw new HttpException("Không thể cập nhật điểm chuẩn thành công", HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBenchmark(benchmarkId: number): Promise<any> {

    const benchmark = await this.findBenchmark(benchmarkId);

    try {
      await this.benchmarksRepo.delete({ benchmarkId: benchmarkId });
      return {
        message: "Đã xóa điểm chuẩn với mã " + benchmarkId + " thành công."
      }
    } catch (error) {
      throw new HttpException("Không thể xóa điểm chuẩn thành công", HttpStatus.BAD_REQUEST);
    }
  }

  private async findBenchmark(id: number): Promise<benchmark> {
    let benchmark;

    try {
      benchmark = await this.benchmarksRepo.findOne({ benchmarkId: id });
    } catch (error) {
      throw new NotFoundException('Không tìm thấy điểm chuẩn có mã này.');
    }

    if (!benchmark) {
      throw new NotFoundException('Không tìm thấy điểm chuẩn có mã này.');
    }

    return benchmark;
  }
}
