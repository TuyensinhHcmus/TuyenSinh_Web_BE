import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AtGuard } from "src/common/guards";
import { AdmissionNotificationsService } from "./admissionNotifications.service";
import { AddNotificationDto } from "./dto/add-notification.dto";



@UseGuards(AuthGuard())
@Controller('admission-notifications')
export class AdmissionNotificationsController {
    constructor(private readonly admissionNotificationsService: AdmissionNotificationsService) { }

    @Post('/add')
    addNotification(@Body() notification: AddNotificationDto) {
        const genId = this.admissionNotificationsService.insertAdmissionNotification(notification)
        return { id: genId }
    }

    @Post('/getNotificationById')
    getListNotificaitonById(@Body('userId') userId: string) {
        const notifications = this.admissionNotificationsService.getListNotificationByUserId(userId)
        return notifications
    }

    @Post('/updateState')
    updateStateNotification(@Body('state') state: string, @Body('notificationId') notificationId: number) {
        const genId = this.admissionNotificationsService.updateStateNotification(notificationId, state)
        return { id: genId }
    }

    @Post('/getLatestNotification')
    getLatestNotification(@Body('userId') userId: string, @Body('amount') amount: number) {
        const notifications = this.admissionNotificationsService.getLatestNotifications(userId, amount)
        return notifications
    }

    @Get('/notifys')
    getAllNotifys(
        @Req() req,
        //@Body('userId') userId: string
    ) {
        const userId = req.user.userId;
        const notifications = this.admissionNotificationsService.getAllNotifys(userId)
        return notifications
    }

    
}