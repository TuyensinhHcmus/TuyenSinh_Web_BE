import { IsNotEmpty } from 'class-validator'
import { Timestamp } from 'typeorm';

export class AddImageDto {
    imagePath: string;

    imageTypeOfTrainingId: string;

    imageType: string;
    
    imageStartDate: Timestamp;

    imageEndDate: Timestamp;
}