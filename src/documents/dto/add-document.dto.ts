import { IsNotEmpty } from 'class-validator'

export class AddDocumentDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    image: string;
}