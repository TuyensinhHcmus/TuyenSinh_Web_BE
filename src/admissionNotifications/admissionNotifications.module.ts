import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionNotificationsController } from "./admissionNotifications.controller";
import { AdmissionNotificationsService } from "./admissionNotifications.service";
import { notification } from "./admissionNotification.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([notification]),
        AuthModule
    ],
    controllers:[AdmissionNotificationsController],
    providers: [AdmissionNotificationsService]
})
export class AdmissionNotificationsModule{
    
}