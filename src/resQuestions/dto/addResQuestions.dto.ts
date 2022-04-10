import { IsNotEmpty } from 'class-validator'

export class TransResQuestion {
    @IsNotEmpty()
    localeCode: string;

    @IsNotEmpty()
    qnaQuestion: string;

    @IsNotEmpty()
    qnaAnswer: string;
}

export class AddResQuestionDto {

    @IsNotEmpty()
    trans: TransResQuestion[];

}