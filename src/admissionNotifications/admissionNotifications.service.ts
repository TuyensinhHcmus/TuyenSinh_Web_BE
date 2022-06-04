import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import RegisterDto from "src/auth/dto/register.dto";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { notification } from "./admissionNotification.entity";
import { AddNotificationDto } from "./dto/add-notification.dto";

@Injectable()
export class AdmissionNotificationsService {
  cronJob: CronJob
  constructor(
    @InjectRepository(notification)
    private readonly notificationModel: Repository<notification>,
    private mailService: MailService
  ) {
    this.cronJob = new CronJob('*/10 * * * * *', async () => {
      try {
        console.log("test auto send mail")
        const user = new RegisterDto();

        user.userEmail = "lyhandong123@gmail.com"
        await this.mailService.sendUserConfirmation(user, "hello");
      } catch (e) {
        console.error(e);
      }
    });
  }

  async insertAdmissionNotification(notificationInformation: AddNotificationDto) {
    let notificationTimestamp = new Date();

    const newNotification = await this.notificationModel.create({
      notificationUserId: notificationInformation.notificationUserId,
      notificationContent: notificationInformation.notificationContent,
      notificationState: notificationInformation.notificationState,
      notificationTimestamp: notificationTimestamp,
      notificationTo: notificationInformation.notificationTo
    });
    const result = await this.notificationModel.save(newNotification);

    return result;
  }

  async getListNotificationByUserId(userId: string) {
    let notifications = await this.findNotification(userId)
    return notifications;
  }

  async getNotifications() {
    const notifications = await this.notificationModel.find({});
    return notifications;
  }

  async getLatestNotifications(userId: string, amount: number) {
    const notifications = await this.notificationModel.find({
      take: amount,
      order: {
        notificationTimestamp: 1
      }
    })

    return notifications;
  }

  async updateStateNotification(notificationId: number, notificationState: string) {
    const notification = await this.findNotificationById(notificationId);

    notification.notificationState = notificationState

    await this.notificationModel.update({ notificationId: notificationId }, notification);

    return notification;
  }

  private async findNotification(userId: string): Promise<notification[]> {
    let notifications;

    try {
      notifications = await this.notificationModel.find({ notificationUserId: userId });
    } catch (error) {
      throw new NotFoundException('Error find notification');
    }
    return notifications ?? [];
  }

  private async findNotificationById(id: number): Promise<notification> {
    let notification;

    try {
      notification = await this.notificationModel.findOne({ notificationId: id });
    } catch (error) {
      throw new NotFoundException('Error find notification.');
    }

    if (!notification) {
      throw new NotFoundException('Could not find notification.');
    }

    return notification;
  }

  async getAllNotifys(userId: string) {
    const listNotify = await this.notificationModel.find({
      where: { notificationUserId: userId },
      order: {
        notificationTimestamp: 'ASC'
      }
    }
    )
    return listNotify;
  }

  async testStart() {
    this.cronJob.start();
  }

  async testStop() {
    this.cronJob.stop();
  }

  async changeStateNotification(notifyId: number) {
    const notification = await this.findNotificationById(notifyId);
    try {
      notification.notificationState = "Đã xem";
      await this.notificationModel.update({ notificationId: notifyId }, notification);

      return {
        message: "Đã thay đổi trạng thái của thông báo thành công."
      }
    } catch (error) {
      
    }
  }
}