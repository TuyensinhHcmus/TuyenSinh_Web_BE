import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
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
    testStart(
        @Query("timeRange") timeRange: string,
        @Query("id") id: string
    ) {
        this.admissionNotificationsService.testStart(timeRange, id);
    }

    @Get('/testStop')
    testEnd(
        @Query("id") id: string
    ) {
        this.admissionNotificationsService.testStop(id);
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
    testSendTopicMessage(
        @Query('body') body: string,
        @Query('title') title: string,
        @Query('screen') screen: string,
        @Query('id') id: string,
        @Query('topic') topic: string
    ) {
        return this.admissionNotificationsService.sendTopicMessage(body, title, screen, id, topic);
    }

    @Get('/testSendToDirectDevice')
    testSendToDirectDevice(
        @Query('body') body: string,
        @Query('title') title: string,
        @Query('screen') screen: string,
        @Query('id') id: string,
        @Query('userId') userId: string
    ) {
        //const tokenHa = 'e661DbRIRui8rZr1ltRZKU:APA91bG724m2xjiDMZFrQ0uL9LBQ36Wq3BIMj7meBF2_42osGOcVJVTlWRm18HG-hKir6qQ3zBvCzl8MgIiV3PiL2EkcyZZz21vuz_vvypW8_6skZrPJiFSxL9ex5hqm_iclgRB6lGzX';
        //const tokenDuc = 'dC9Wu6oySBGSj5UqimxfXA:APA91bGe_LHIdGuT8G43mTeH438W4_CN73YbQLg9R7phUEx1dyzvuhznQoaO1tOXg1ER1yaUTu_CzqAxJNs23lXp7bExIJ-coyccqzqTxN0nxLBsU5V6CIRRLPQ-22Um2qKSOqtcbVag';
        return this.admissionNotificationsService.sendToDirectDevice(
            body,
            title,
            screen,
            id,
            userId);
    }

    @Get('/sendAllMessage')
    sendAllMessage(
        @Query('body') body: string,
        @Query('title') title: string,
        @Query('screen') screen: string,
        @Query('id') id: string,
        @Query('image') image: string
    ) {
        return this.admissionNotificationsService.sendAllMessage(body, title, screen, id, image);
    }
}