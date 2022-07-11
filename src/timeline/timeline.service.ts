import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { timeline } from "./timeline.entity";
import { TimelineDto } from "./dto/add-timeline-dto";
import { AdmissionNotificationsService } from "src/admissionNotifications/admissionNotifications.service";
import RegisterDto from "src/auth/dto/register.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(timeline)
    private readonly timelineModel: Repository<timeline>,
    private readonly notifyService: AdmissionNotificationsService,
    private readonly mailService: MailService
  ) { }

  async convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  }

  async insertTimeline(timelineInformation: TimelineDto) {

    let timeStart = await this.convertTZ(timelineInformation.timelineStart.toString(), 'Asia/Ho_Chi_Minh');
    let timeEnd = await this.convertTZ(timelineInformation.timelineEnd.toString(), 'Asia/Ho_Chi_Minh');


    const newTimeline = this.timelineModel.create({
      ...timelineInformation
    });
    const result = await this.timelineModel.save(newTimeline);
    // console.log("rult", result);

    // Send notify for all etne Ha
    await this.notifyService.sendAllMessage(
      result.timelineTitle,
      "Cập nhật sự kiện tuyển sinh mới",
      "timeline",
      result.timelineId.toString(),
      "https://firebasestorage.googleapis.com/v0/b/hcmus-admission.appspot.com/o/imageForApp%2FLogo_HCMUS.png?alt=media&token=88f00455-aa8c-4bf3-a07c-ef7e96e66a5d"
    )


    // Khi sự kiện bắt đầu thì gửi thông báo và 
    // trước khi sự kiện kết thúc 12 giờ thì gửi thông báo 

    // Convert to date


    let rangeTime = timeEnd.getHours() - timeStart.getHours();
    if (rangeTime > 12) {
      timeEnd.setHours(timeEnd.getHours() - 12);
    }

    if (rangeTime < 12 && rangeTime > 1) {
      timeEnd.setHours(timeEnd.getHours() - 1);
    }
    if (rangeTime < 1) {
      let rangeTime1 = timeEnd.getMinutes() - timeStart.getMinutes();
      if (rangeTime1 > 1) {
        timeEnd.setMinutes(timeEnd.getMinutes() - 1);
      }
    }

    // Get timeRange1
    const timeRange1Hour = timeStart.getHours().toString();
    const timeRange1Day = timeStart.getDate().toString();
    const timeRange1Month = timeStart.getMonth().toString();
    const timeRang1Minute = timeStart.getMinutes().toString();

    const timeRange1 = "0 " + timeRang1Minute + " " + timeRange1Hour + " " + timeRange1Day + " " + timeRange1Month + " *";
    console.log(timeRange1);

    // Get timeRange2
    const timeRange2Hour = timeEnd.getHours().toString();
    const timeRange2Day = timeEnd.getDate().toString();
    const timeRange2Month = timeEnd.getMonth().toString();
    const timeRang2Minute = timeEnd.getMinutes().toString();

    const timeRange2 = "0 " + timeRang2Minute + " " + timeRange2Hour + " " + timeRange2Day + " " + timeRange2Month + " *";
    console.log(timeRange2);

    // Create a function
    let callbackfunction = async () => {
      // const user1 = new RegisterDto();

      // user1.userEmail = "lyhandong123@gmail.com"
      // await this.mailService.sendUserConfirmation(user1, timeRange1);
      // Send notify
      await this.notifyService.sendTopicMessage(
        result.timelineTitle,
        "Nhắc nhở sự kiện tuyển sinh",
        "events",
        result.timelineId.toString(),
        result.timelineId.toString()
      )
    }

    // Call cron jon
    await this.notifyService.testStart(timeRange1, timeRange2, result.timelineId.toString(), callbackfunction);

    return result;
  }

  async deleteTimeline(timelineId: number) {

    const result = await this.timelineModel.delete({ timelineId: timelineId });
    return result;
  }

  async getTimelineById(timelineId: number) {
    let timeline = await this.timelineModel.find({ timelineId: timelineId })
    return timeline;
  }

  async getTimelinesByTypeOfTrainingId(typeOfTrainingId: string) {
    let timeline = await this.timelineModel.find({ timelineTypeOfTrainingID: typeOfTrainingId })
    return timeline;
  }

  async getTimelines() {
    const timelines = await this.timelineModel.find({
      order: {
        timelineStart: 'ASC'
      }
    });
    return timelines;
  }

  async updateTimeline(timelineId: number, timelineInformation: TimelineDto) {
    let result = await this.timelineModel.update({ timelineId: timelineId }, timelineInformation);
    if (result.affected === 0) {
      throw new HttpException("No data updated", 400);
    }
    else {
      let timeStart = await this.convertTZ(timelineInformation.timelineStart.toString(), 'Asia/Ho_Chi_Minh');
      let timeEnd = await this.convertTZ(timelineInformation.timelineEnd.toString(), 'Asia/Ho_Chi_Minh');

      let rangeTime = timeEnd.getHours() - timeStart.getHours();
      if (rangeTime > 12) {
        timeEnd.setHours(timeEnd.getHours() - 12);
      }

      if (rangeTime < 12 && rangeTime > 1) {
        timeEnd.setHours(timeEnd.getHours() - 1);
      }
      if (rangeTime < 1) {
        let rangeTime1 = timeEnd.getMinutes() - timeStart.getMinutes();
        if (rangeTime1 > 1) {
          timeEnd.setMinutes(timeEnd.getMinutes() - 1);
        }
      }

      // Get timeRange1
      const timeRange1Hour = timeStart.getHours().toString();
      const timeRange1Day = timeStart.getDate().toString();
      const timeRange1Month = timeStart.getMonth().toString();
      const timeRang1Minute = timeStart.getMinutes().toString();

      const timeRange1 = "0 " + timeRang1Minute + " " + timeRange1Hour + " " + timeRange1Day + " " + timeRange1Month + " *";
      console.log(timeRange1);

      // Get timeRange2
      const timeRange2Hour = timeEnd.getHours().toString();
      const timeRange2Day = timeEnd.getDate().toString();
      const timeRange2Month = timeEnd.getMonth().toString();
      const timeRang2Minute = timeEnd.getMinutes().toString();

      const timeRange2 = "0 " + timeRang2Minute + " " + timeRange2Hour + " " + timeRange2Day + " " + timeRange2Month + " *";
      console.log(timeRange2);

      // Create a function
      let callbackfunction = async () => {
        const user1 = new RegisterDto();

        user1.userEmail = "lyhandong123@gmail.com"
        await this.mailService.sendUserConfirmation(user1, timeRange1);
        // Send notify
        await this.notifyService.sendTopicMessage(
          timelineId.toString(),
          "Nhắc nhở sự kiện tuyển sinh",
          "events",
          timelineId.toString(),
          timelineId.toString()
        )
      }

      // Stop cron job
      let jobMap = await this.notifyService.getJobMap();
      let cronJobInMap = jobMap.get(timelineId.toString());
      if(cronJobInMap)
      {
        cronJobInMap.stop();
        jobMap.delete(timelineId.toString());
      }

      // Call cron job
      await this.notifyService.testStart(timeRange1, timeRange2, timelineId.toString(), callbackfunction);


      return result;
    }
  }

  // async getLatestNotifications(userId: string, amount: number) {
  //     const notifications = await this.timelineModel.find({
  //         take: amount,
  //         order: {
  //           notificationTimestamp: 1
  //         }
  //       })

  //       return notifications;
  // }

  // async updateStateNotification(notificationId: number, notificationState: string) {
  //     const notification = await this.findNotificationById(notificationId);

  //     notification.notificationState = notificationState

  //     await this.timelineModel.update({ timelineId: notificationId }, notification);

  //     return notification;
  // }

  // private async findNotification(userId: string): Promise<timeline[]> {
  //     let notifications;

  //     try {
  //       notifications = await this.timelineModel.find({ notificationUserId: userId });
  //     } catch (error) {
  //       throw new NotFoundException('Error find notification');
  //     }
  //     return notifications ?? [];
  //   }

  //   private async findNotificationById(id: number): Promise<timeline> {
  //     let notification;

  //     try {
  //       notification = await this.timelineModel.findOne({ timelineId: id });
  //     } catch (error) {
  //       throw new NotFoundException('Error find notification.');
  //     }

  //     if (!notification) {
  //       throw new NotFoundException('Could not find notification.');
  //     }

  //     return notification;
  //   }
}