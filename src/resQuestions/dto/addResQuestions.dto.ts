import { IsNotEmpty } from 'class-validator'

export class AddResQuestionDto {

    @IsNotEmpty()
    qnaCreator: string;

    @IsNotEmpty()
    qnaQuestionImage: string;

    @IsNotEmpty()
    qnaAnswerImage: string;
}