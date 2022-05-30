import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionNotificationsController } from "./admissionNotifications.controller";
import { AdmissionNotificationsService } from "./admissionNotifications.service";
import { notification } from "./admissionNotification.entity";
import { MailModule } from "src/mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([notification]),
        AuthModule,
        MailModule
    ],
    controllers:[AdmissionNotificationsController],
    providers: [AdmissionNotificationsService]
})
export class AdmissionNotificationsModule{
    
}