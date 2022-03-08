import { Module } from "@nestjs/common";
import { AdmissionNotificationsController } from "./admissionNotifications.controller";
import { AdmissionNotificationsService } from "./admissionNotifications.service";

@Module({
    controllers:[AdmissionNotificationsController],
    providers: [AdmissionNotificationsService]
})
export class AdmissionNotificationsModule{
    
}