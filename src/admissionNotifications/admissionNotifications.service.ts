import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import RegisterDto from "src/auth/dto/register.dto";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { notification } from "./admissionNotification.entity";
import { AddNotificationDto } from "./dto/add-notification.dto";
import * as firebase from "firebase-admin";
const { v4: uuidv4 } = require('uuid')

import { UsersService } from "src/users/users.service";
//var serviceAccount = require("D:/HỌC TẬP/NĂM 4/HK2/Đồ án tốt nghiệp/TuyenSinh_Web_BE/src/admissionNotifications/serviceAccountKey.json");
var serviceAccount = require("../../src/admissionNotifications/serviceAccountKey.json");
//../../src/admissionNotifications/serviceAccountKey.json
import { getStorage } from "firebase-admin/storage"
@Injectable()
export class AdmissionNotificationsService {
  cronJob: CronJob
  private defaultApp: any;
  private db: any;
  private bucket: any;
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
      credential: firebase.credential.cert(serviceAccount),
      storageBucket: 'gs://hcmus-admission.appspot.com'
    });

    this.db = firebase.firestore();

    this.bucket = getStorage().bucket();

  }

  getDb() {
    return this.db;
  }

  getBucket() {
    return this.bucket;
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


  async sendToDirectDevice(body: any, title: any, screen: any, id: any, userId: any) {
    let user = await this.userService.findUserById(userId);
    try {
      let tokenDevice = user.currentTokenDevice;

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

      let notifyId = uuidv4();

      var notifyData = {
        body: body,
        title: title,
        date: new Date().toString(), //etne fix timestamp
        image: "image",
        status: "unread",
        data: "this is data",
        type: screen,
        id: notifyId
      };

      await this.db
        .collection("notify")
        .doc("abc")
        .set({ [notifyId]: notifyData })


      if (tokenDevice) {
        // Send message
        firebase.messaging().send(DATA)
          .then((response) => {
            console.log('Success sent message: ' + response);
          })
          .catch((err) => {
            console.log('Error sending message: ' + err);
          });
      }
    } catch (error) {

    }

  }

  // var notifyData = {
  //   body: "Los Angeles",
  //   title: "CA",
  //   date: "1656061958",
  //   image: "image",
  //   status: "unread",
  //   data: "this is data",
  //   type: "timeline",
  //   id: "notifyId"
  // };

  // db
  // .collection("notify")
  // .doc(userId)
  // .set({notifyId : notifyData})
  // .onError((e, _) => print("Error writing document: $e"));

  async sendTopicMessage(body: any, title: any, screen: any, id: any, topic: any) {
    var listUserId = [];
    let object;
    await this.db.collection('topics').get().then((value) => {
      value.docs.forEach((element) => {
        if (element.id === topic) {
          object = element.data();
        }
      })
    })

    console.log(new Date().getTime().toString());


    const objectArray = Object.entries(object);

    objectArray.forEach(([key, value]) => {
      listUserId.push(key)
    });



    for (let i = 0; i < listUserId.length; i++) {

      var notifyIdentity = uuidv4();

      console.log(notifyIdentity)
      var notifyData = {
        body: body,
        title: title,
        date: new Date().toString(), //etne fix timestamp
        image: "https://firebasestorage.googleapis.com/v0/b/hcmus-admission.appspot.com/o/imageForApp%2Fkisspng-blue-bachelors-degree-cartoon-cartoon-blue-bachelor-cap-5a8d4e86607602.0098409015192101183951.png?alt=media&token=b1ff7483-b0c1-4bec-9102-1bda5c7b1e80",
        status: "unread",
        data: id,
        type: "timeline",
        id: notifyIdentity
      };

      const someValueArray = notifyData;

      const obj = {
        [notifyIdentity]: someValueArray,
      }


      await this.db
        .collection("notify")
        .doc(listUserId[i])
        .set(obj);

    }

    console.log(listUserId);

    // Find in db where tokenDevices current in listUserId
    let tokenDevices;
    tokenDevices = [];

    // Get user from listUserId
    let listUser = [];
    let user;
    for (let i = 0; i < listUserId.length; i++) {
      user = await this.userService.getUserById(listUserId[i]);
      if (user) {
        listUser.push(user);
      }
    }

    listUser.forEach(user => {
      //console.log(user)
      if (user.currentTokenDevice !== '') {
        tokenDevices.push(user.currentTokenDevice);
      }
    });

    //console.log(tokenDevices);

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
      tokens: tokenDevices // Here is devices token need to send
    };


    // Send message
    if (tokenDevices.length !== 0) {
      firebase.messaging().sendMulticast(DATA)
        .then((response) => {
          console.log('Success sent message: ' + response);
        })
        .catch((err) => {
          console.log('Error sending message: ' + err);
        });
    }
  }

  async sendAllMessage(body: any, title: any, screen: any, id: any, image: any) {
    const topic = 'all';

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
      topic: topic
    };


    // Send a message to devices subscribed to the provided topic.
    firebase.messaging().send(DATA)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
    //console.log(tokenDevices);
  }
  // async findAll() {
  //   const result = [];
  //   const firestore = new firebase.firestore.Firestore();

  //   (await firestore.collection('topics').get()).docs.map(data => {
  //     if (data.id == topic) {
  //       listUserId.push(element.data());
  //     }
  //   })
  // }
}