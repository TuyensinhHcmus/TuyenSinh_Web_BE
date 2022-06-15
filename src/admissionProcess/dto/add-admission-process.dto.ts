import { IsNotEmpty } from 'class-validator'

export class AddAdmissionProcessDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    step: string;

    @IsNotEmpty()
    typeOfTrainingId: string;
}