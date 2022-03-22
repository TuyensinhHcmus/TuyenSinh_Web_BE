import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { RtStrategy } from './strategys/rt.strategy';
import { GoogleStrategy } from './strategys/gg.strategy';


@Module({
  imports: [
    UsersModule, 
    PassportModule.register({}), 
    JwtModule.register({})
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, RtStrategy, GoogleStrategy, PassportModule],
})
export class AuthModule {}
