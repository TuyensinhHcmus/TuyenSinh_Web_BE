import { IsNotEmpty } from 'class-validator'

export class AddBenchmarkDto {
    @IsNotEmpty()
    benchmarkImage: string;
}