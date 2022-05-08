import { IsNotEmpty } from 'class-validator'
import { Timestamp } from 'typeorm';

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

    @IsNotEmpty()
    dateStart: Timestamp;

    @IsNotEmpty()
    dateEnd: Timestamp;

    @IsNotEmpty()
    typeOfTrainingID: string;

}