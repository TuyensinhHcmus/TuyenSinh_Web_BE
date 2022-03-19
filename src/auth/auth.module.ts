import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RtStrategy } from './rt.strategy';


@Module({
  imports: [
    UsersModule, 
    PassportModule.register({}), 
    JwtModule.register({})
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, RtStrategy, PassportModule],
})
export class AuthModule {}
