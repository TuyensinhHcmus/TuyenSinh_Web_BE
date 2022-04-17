import { IsNotEmpty, IsString } from 'class-validator'

export class TimelineDto {
    timelineId: number;

    @IsNotEmpty() 
    timelineTitle: string;

    @IsNotEmpty() 
    timelineContent: string;

    @IsNotEmpty()
    timelineStart: Date;

    @IsNotEmpty()
    timelineEnd: Date;
}