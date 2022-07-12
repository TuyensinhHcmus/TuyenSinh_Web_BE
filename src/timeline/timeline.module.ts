import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineController } from "./timeline.controller";
import { TimelineService } from "./timeline.service";
import { timeline } from "./timeline.entity";
import { AdmissionNotificationsModule } from "src/admissionNotifications/admissionNotifications.module";
import { MailModule } from "src/mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([timeline]),
        AuthModule,
        AdmissionNotificationsModule,
        MailModule
    ],
    controllers:[TimelineController],
    providers: [TimelineService]
})
export class TimelineModule{
    
}