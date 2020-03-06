import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // !LocalAuth-Guard for first time Authenication of client and generating token
  // If Client trys to hit the POST-auth/login route which we have protected via AuthGaurd using LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.checkLogin(req.user);
  }

  // !JWT-Guard, For Authorization of client
  @UseGuards(JwtAuthGuard)
  @Get('resource')
  getProfile(@Request() req) {
    return { ...req.user, status: 'You are valid user' };
  }
}
