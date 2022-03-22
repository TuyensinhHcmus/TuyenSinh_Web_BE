import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdmissionNotificationsService } from "./admissionNotifications.service";

@UseGuards(AuthGuard())
@Controller('admission-notifications')
export class AdmissionNotificationsController {
    constructor( private readonly admissionNotificationsService: AdmissionNotificationsService) {}

    @Post()
    addNotification(@Body('title') titleBody: string, @Body('description') descBody: string) {
        const genId =  this.admissionNotificationsService.insertAdmissionNotification(titleBody, descBody);
        return { id : genId}
    }
}