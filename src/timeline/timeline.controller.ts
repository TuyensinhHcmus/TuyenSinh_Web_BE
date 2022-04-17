import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TimelineService } from "./timeline.service";
import { TimelineDto } from "./dto/add-timeline-dto";

@UseGuards(AuthGuard())
@Controller('timeline')
export class TimelineController {
    constructor( private readonly timelineService: TimelineService) {}

    @Post('add')
    addTimeline(@Body() timelineInfo: TimelineDto) {
        const genId =  this.timelineService.insertTimeline(timelineInfo)
        return { id : genId}
    }

    @Post('delete')
    deleteTimeline(@Body('timelineId') timelineId: number) {
        const res =  this.timelineService.deleteTimeline(timelineId)
        return res
    }

    @Post('update')
    updateTimeline(@Body() timelineInfo: TimelineDto) {
        let {timelineId, ...other} = timelineInfo
        const genId =  this.timelineService.updateTimeline(timelineId, timelineInfo)
        return { id : genId}
    }

    @Get('getall')
    getTimelines() {
        const notifications =  this.timelineService.getTimelines()
        return notifications
    }

    @Get(':id')
    getTimelineById(@Param('id') id: number) {
        const notifications =  this.timelineService.getTimelineById(id)
        return notifications
    }

}