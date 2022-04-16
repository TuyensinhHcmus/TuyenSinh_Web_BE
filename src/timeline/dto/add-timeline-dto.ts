import { IsNotEmpty, IsString } from 'class-validator'

export class TimelineDto {
    @IsNotEmpty() 
    timelineTitle: string;

    @IsNotEmpty() 
    timelineContent: string;

    @IsNotEmpty()
    timelineStart: Date;

    @IsNotEmpty()
    timelineEnd: Date;
}