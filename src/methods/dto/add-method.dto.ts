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

    dateStart: Timestamp;

    dateEnd: Timestamp;

    @IsNotEmpty()
    typeOfTrainingID: string;

    @IsNotEmpty()
    target: string;

    @IsNotEmpty()
    object: string;

    @IsNotEmpty()
    limitAspiration: number;

    startEdit: Timestamp;

    endEdit: Timestamp;

    endPayFee: Date;

    resultTime: Date
}