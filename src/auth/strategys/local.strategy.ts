import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    });
  }

  async validate(userEmail: string, userPassword: string): Promise<any> {
    console.log("chay local strategy", userEmail, userPassword);
    const user = await this.authService.validateUser(userEmail, userPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}