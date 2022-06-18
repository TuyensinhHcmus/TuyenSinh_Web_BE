import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AddBenchmarkDto } from './add-benchmark.dto';

export class UpdateBenchmarkDto extends PartialType(AddBenchmarkDto) {
    @IsNotEmpty()
    benchmarkId: number
}