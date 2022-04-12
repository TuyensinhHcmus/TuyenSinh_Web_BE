import { IsNotEmpty } from 'class-validator'

export class AddMethodDto {

    @IsNotEmpty()
    methodId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    parentId: string;
}