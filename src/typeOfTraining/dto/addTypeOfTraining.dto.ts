import { IsNotEmpty } from 'class-validator'

export class AddTypeOfTrainingDto {
    @IsNotEmpty()
    typeOfTrainingId: string;

    @IsNotEmpty()
    typeOfTrainingName: string;

    @IsNotEmpty()
    typeOfTrainingDescription: string;
}