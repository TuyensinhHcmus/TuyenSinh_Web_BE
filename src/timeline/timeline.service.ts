import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { timeline } from "./timeline.entity";
import { TimelineDto } from "./dto/add-timeline-dto";

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(timeline)
    private readonly timelineModel: Repository<timeline>,
  ) { }

  async insertTimeline(timelineInformation: TimelineDto) {

    const newTimeline = this.timelineModel.create({
      ...timelineInformation
    });
    const result = await this.timelineModel.save(newTimeline);

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

  async getTimelines() {
    const timelines = await this.timelineModel.find({});
    return timelines;
  }

  async updateTimeline(timelineId: number, timelineInformation: TimelineDto) {
    let result =  await this.timelineModel.update({ timelineId: timelineId }, timelineInformation);
    if( result.affected ===0 )
    {
      throw new HttpException("No data updated", 400);
    }
    else{
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