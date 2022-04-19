import { PartialType } from '@nestjs/swagger';
import { AddBenchmarkDto } from './add-benchmark.dto';

export class UpdateBenchmarkDto extends PartialType(AddBenchmarkDto) {}