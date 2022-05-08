import { IsNotEmpty } from 'class-validator'

export class AddProgramDto {
    @IsNotEmpty()
    majorId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    documentLink: string;

    @IsNotEmpty()
    typeOfTrainingID: string;
}