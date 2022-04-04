import { IsNotEmpty } from 'class-validator'

export class AddTuitionDto {
    @IsNotEmpty()
    majorId: string

    @IsNotEmpty()
    fee: string

    @IsNotEmpty()
    feeIncRate: string

    @IsNotEmpty()
    documentary: string
}