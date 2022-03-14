import { IsNotEmpty } from 'class-validator'

export class AddMethodDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    image: string;
}