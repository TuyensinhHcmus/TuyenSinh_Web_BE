import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AtGuard } from "src/common/guards";
import { AdmissionNotificationsService } from "./admissionNotifications.service";
import { AddNotificationDto } from "./dto/add-notification.dto";



//@UseGuards(AuthGuard())
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

    @UseGuards(AtGuard)
    @Get('/notifys')
    getAllNotifys(
        @Req() req,
        //@Body('userId') userId: string
    ) {
        const userId = req.user.userId;
        const notifications = this.admissionNotificationsService.getAllNotifys(userId)
        return notifications
    }

    @Get('/testStart')
    testStart() {
        this.admissionNotificationsService.testStart();
    }

    @Get('/testStop')
    testEnd() {
        this.admissionNotificationsService.testStop();
    }

    @UseGuards(AtGuard)
    @Post('/postNotify')
    postNotify(
        //@Req() req,
        @Body('notifyId') notifyId: number
    ) {
        //const userId = req.user.userId;
        const notifications = this.admissionNotificationsService.changeStateNotification(notifyId)
        return notifications
    }

    @Get('/testSendTopicMessage')
    testSendTopicMessage() {
        this.admissionNotificationsService.sendTopicMessage('body', 'Topic', 'scree', '123', '5');
    }

    @Get('/testSendToDirectDevice')
    testSendToDirectDevice() {
        this.admissionNotificationsService.sendToDirectDevice('body', 'Direct', 'screen','123','e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX');
    }
}