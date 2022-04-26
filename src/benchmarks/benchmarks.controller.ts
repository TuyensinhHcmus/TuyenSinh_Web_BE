import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AddBenchmarkDto } from './dto/add-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';
import { BenchmarksService } from './benchmarks.service';
import { benchmark } from './benchmark.entity';

@Controller('benchmarks')
export class BenchmarksController {
  constructor(private readonly benchmarksService: BenchmarksService) {}

  // [GET] /benchmarks
  @Get()
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

  // [PATCH] /benchmarks/:id
  @Patch(':id')
  async updateBenchmark(
    @Param('id') id: string,
    @Body() updateBenchmarkDto: UpdateBenchmarkDto,
  ): Promise<benchmark> {
    return await this.benchmarksService.updateBenchmark(id, updateBenchmarkDto);
  }
}
