import { IsNotEmpty } from 'class-validator'

export class AddAspirationDto {
    @IsNotEmpty()
    aspirationMajor: string;

    @IsNotEmpty()
    aspirationState: string;

    @IsNotEmpty()
    aspirationCvId: number;
}