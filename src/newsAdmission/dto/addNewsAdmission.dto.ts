import { IsNotEmpty } from 'class-validator'
import { Timestamp } from 'typeorm';

export class AddNewsAdmissionDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    dateCreate: Timestamp;

    @IsNotEmpty()
    creator: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    typeOfTrainingID: string;

    @IsNotEmpty()
    typeOfProgram: string;

    @IsNotEmpty()
    newsImage: string
}