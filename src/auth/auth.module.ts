import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { RtStrategy } from './strategys/rt.strategy';
import { GoogleStrategy } from './strategys/gg.strategy';
import { UnVerifyUsersModule } from 'src/unverifyuser/unverifyuser.module';


@Module({
  imports: [
    UsersModule,
    UnVerifyUsersModule, 
    PassportModule.register({defaultStrategy: 'jwt'}), 
    JwtModule.register({
      secret: "topSecret51",
      signOptions:{
        expiresIn: 3600,
      }
    }),
    MailModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, RtStrategy, GoogleStrategy, PassportModule],
})
export class AuthModule {}
