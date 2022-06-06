import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import RegisterDto from "src/auth/dto/register.dto";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { notification } from "./admissionNotification.entity";
import { AddNotificationDto } from "./dto/add-notification.dto";
import * as firebase from "firebase-admin";
import { UsersService } from "src/users/users.service";
//var serviceAccount = require("D:/HỌC TẬP/NĂM 4/HK2/Đồ án tốt nghiệp/TuyenSinh_Web_BE/src/admissionNotifications/serviceAccountKey.json");
var serviceAccount = require("../../src/admissionNotifications/serviceAccountKey.json");
@Injectable()
export class AdmissionNotificationsService {
  cronJob: CronJob
  private defaultApp: any;
  private db: any;
  constructor(
    @InjectRepository(notification)
    private readonly notificationModel: Repository<notification>,
    private mailService: MailService,
    private userService: UsersService,
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

    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount)
    });

    this.db = firebase.firestore();
  }

  getDb() {
    return this.db;
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


  async sendToDirectDevice(body: any, title: any, screen: any, id: any, tokenDevice: any) {
    // Set up message
    var DATA = {
      notification: {
        body: body,
        title: title,
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        sound: "default",
        status: "done",
        id: id,
        screen: screen,
      },
      token: tokenDevice // Here is device token need to send
    };

    // Send message
    firebase.messaging().send(DATA)
      .then((response) => {
        console.log('Success sent message: ' + response);
      })
      .catch((err) => {
        console.log('Error sending message: ' + err);
      });

  }

async sendTopicMessage(body: any, title: any, screen: any, id: any, topic: any) {
  var listUserId = [];
  await this.db.collection('topics').get().then((value) => {
    value.docs.forEach((element) => {
      if (element.id == topic) {
        listUserId = element.data().keys.toList();
      }
    })
  })
  // Find in db where tokenDevices current in listUserId
  let tokenDevices;
  tokenDevices = [];

  const listUser = await this.userService.getUsers();
  listUser.forEach(user =>{
    if(user.currentTokenDevice !== ''){
      tokenDevices.push(user.currentTokenDevice);
    }
  });

  console.log(tokenDevices);

  // Set up message
  let DATA = {
    notification: {
      body: body,
      title: title,
    },
    data: {
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      sound: "default",
      status: "done",
      id: id,
      screen: screen,
    },
    token: tokenDevices // Here is devices token need to send
  };

  // Send message
  firebase.messaging().send(DATA)
    .then((response) => {
      console.log('Success sent message: ' + response);
    })
    .catch((err) => {
      console.log('Error sending message: ' + err);
    });
}
}