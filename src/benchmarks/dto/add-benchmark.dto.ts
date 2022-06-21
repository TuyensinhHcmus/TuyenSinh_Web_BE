import { IsNotEmpty } from 'class-validator'

export class AddBenchmarkDto {
    @IsNotEmpty()
    benchmarkMajorId: string;

    @IsNotEmpty()
    benchmarkYear: number;

    @IsNotEmpty()
    benchmarkScore: number;

    @IsNotEmpty()
    benchmarkMethodId: string;
}