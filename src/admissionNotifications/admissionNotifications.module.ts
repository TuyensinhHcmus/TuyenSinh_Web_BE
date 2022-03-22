import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AdmissionNotificationsController } from "./admissionNotifications.controller";
import { AdmissionNotificationsService } from "./admissionNotifications.service";

@Module({
    imports: [AuthModule],
    controllers:[AdmissionNotificationsController],
    providers: [AdmissionNotificationsService]
})
export class AdmissionNotificationsModule{
    
}