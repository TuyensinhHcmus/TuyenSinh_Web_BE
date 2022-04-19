import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { unverifyuser } from './unverifyuser.entity';
import { UnVerifyUsersService } from './unverifyuser.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([unverifyuser]),
    ],
    providers: [UnVerifyUsersService],
    exports: [UnVerifyUsersService]
})
export class UnVerifyUsersModule { }