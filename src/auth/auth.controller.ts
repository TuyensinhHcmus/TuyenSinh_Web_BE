import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './local.auth.guard';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.registerUser(registrationData);
  }
 
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() req: RequestWithUser) {
    const user = req.user;
    user.userPassword = undefined;
    return user;
  }
}