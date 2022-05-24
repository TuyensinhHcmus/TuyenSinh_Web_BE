import { PartialType } from '@nestjs/swagger';
import { AddTypeOfTrainingDto } from './addTypeOfTraining.dto';


export class UpdateTypeOfTrainingDto extends PartialType(AddTypeOfTrainingDto) {
}