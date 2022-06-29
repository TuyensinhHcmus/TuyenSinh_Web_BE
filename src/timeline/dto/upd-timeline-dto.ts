import { IsNotEmpty, IsString } from 'class-validator'

export class UpdTimelineDto {
    @IsNotEmpty() 
    timelineId: number;

    @IsNotEmpty() 
    timelineTitle: string;

    @IsNotEmpty() 
    timelineContent: string;

    @IsNotEmpty()
    timelineStart: Date;

    @IsNotEmpty()
    timelineEnd: Date;

    @IsNotEmpty()
    timelineTypeOfTrainingID: string;
}