import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLoggedInUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user && user.password === pass) {
      // *Password should be bycrypted and salted
      const { password, ...result } = user; // result -> {"userId":1,"username":"john"}
      return result;
    }
    return null;
  }

  async checkLogin(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
