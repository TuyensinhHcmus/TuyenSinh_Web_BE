import { IsNotEmpty } from 'class-validator'
import { Timestamp } from 'typeorm';

export class AddResQuestionDto {

    @IsNotEmpty()
    qnaCreator: string;

    @IsNotEmpty()
    qnaDateCreate: Timestamp;

    @IsNotEmpty()
    qnaQuestion: string;

    @IsNotEmpty()
    qnaAnswer: string;

    @IsNotEmpty()
    qnaTypeOfTrainingID: string;
}