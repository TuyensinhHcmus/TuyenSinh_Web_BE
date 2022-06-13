import { IsNotEmpty } from 'class-validator';

export class UpdateNewsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    typeOfTrainingID: string;

    @IsNotEmpty()
    typeOfProgram: string;

    @IsNotEmpty()
    image: string
}