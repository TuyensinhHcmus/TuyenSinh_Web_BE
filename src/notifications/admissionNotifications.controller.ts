import { Body, Controller, Post } from "@nestjs/common";
import { AdmissionNotificationsService } from "./admissionNotifications.service";

@Controller('admission-notifications')
export class AdmissionNotificationsController {
    constructor( private readonly admissionNotificationsService: AdmissionNotificationsService) {}

    @Post()
    addNotification(@Body('title') titleBody: string, @Body('description') descBody: string) {
        const genId =  this.admissionNotificationsService.insertAdmissionNotification(titleBody, descBody);
        return { id : genId}
    }
}