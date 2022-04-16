import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TimelineService } from "./timeline.service";
import { TimelineDto } from "./dto/add-timeline-dto";

@UseGuards(AuthGuard())
@Controller('timeline')
export class TimelineController {
    constructor( private readonly timelineService: TimelineService) {}

    @Post('/add')
    addTimeline(@Body() notification: TimelineDto) {
        const genId =  this.timelineService.insertTimeline(notification)
        return { id : genId}
    }

    // @Post('/getNotificationById')
    // getListNotificaitonById(@Body('userId') userId: string) {
    //     const notifications =  this.admissionNotificationsService.getListNotificationByUserId(userId)
    //     return notifications
    // }

    // @Post('/updateState')
    // updateStateNotification(@Body('state') state: string, @Body('notificationId') notificationId: number) {
    //     const genId =  this.admissionNotificationsService.updateStateNotification(notificationId, state)
    //     return { id : genId}
    // }

    // @Post('/getLatestNotification')
    // getLatestNotification(@Body('userId') userId: string, @Body('amount') amount: number) {
    //     const notifications =  this.admissionNotificationsService.getLatestNotifications(userId, amount)
    //     return notifications
    // }

}