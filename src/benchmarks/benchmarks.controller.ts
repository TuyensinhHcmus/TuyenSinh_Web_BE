import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AddBenchmarkDto } from './dto/add-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';
import { BenchmarksService } from './benchmarks.service';
import { benchmark } from './benchmark.entity';

@Controller('benchmarks')
export class BenchmarksController {
  constructor(private readonly benchmarksService: BenchmarksService) {}

  // [GET] /benchmarks
  @Get('getall')
  async getAllBenchmarks(): Promise<benchmark[]> {
    const benchmarks = await this.benchmarksService.getBenchmarks();
    return benchmarks;
  }

  @Get('getByYear')
  async getAllBenchmarksByYear(
    @Query('year') year: string
  ): Promise<any[]> {
    const benchmarks = await this.benchmarksService.getBenchmarksByYear(year);

    return benchmarks;
  }

  //[Post] /benchmarks/add
  @Post('addBenchmark')
  async addBenchmark(
    @Body() addBenchmarkDto: AddBenchmarkDto,
  ): Promise<benchmark> {
    return await this.benchmarksService.addBenchmark(addBenchmarkDto);
  }

  // [Put] /benchmarks/:id
  @Put('updateBenchmark')
  async updateBenchmark(
    @Body() updateBenchmarkDto: UpdateBenchmarkDto,
  ): Promise<benchmark> {
    return await this.benchmarksService.updateBenchmark(updateBenchmarkDto);
  }

  @Delete('deleteBenchmark')
  async deleteBenchmark(
    @Body('benchmarkId') benchmarkId: number,
  ): Promise<any> {
    return await this.benchmarksService.deleteBenchmark(benchmarkId);
  }
}
