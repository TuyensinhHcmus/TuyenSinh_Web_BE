import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { user } from './users.entity'
import { StatisticModule } from 'src/statistic/statistic.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([user]),
        StatisticModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }