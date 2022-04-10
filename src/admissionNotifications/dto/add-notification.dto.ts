import { IsNotEmpty, IsString } from 'class-validator'

export class AddNotificationDto {
    notificationUserId: string | null;

    @IsNotEmpty() 
    notificationContent: string;

    @IsNotEmpty()
    notificationTo: string;

    @IsNotEmpty()
    notificationState: string;
}