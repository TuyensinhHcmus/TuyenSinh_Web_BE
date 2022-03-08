import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmissionNotificationsModule } from './notifications/admissionNotifications.module';

@Module({
  imports: [AdmissionNotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
