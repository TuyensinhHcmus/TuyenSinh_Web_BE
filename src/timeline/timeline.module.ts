import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelineController } from "./timeline.controller";
import { TimelineService } from "./timeline.service";
import { timeline } from "./timeline.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([timeline]),
        AuthModule
    ],
    controllers:[TimelineController],
    providers: [TimelineService]
})
export class TimelineModule{
    
}