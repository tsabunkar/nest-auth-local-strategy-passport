import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

// Creating the local-Strategy using passportjs
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // Overriding validate(), to customize the validation
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLoggedInUser(
      username,
      password,
    );
    if (!user) {
      // !If User is in-valid then return the user object
      throw new UnauthorizedException();
    }
    // If User is valid then return the user object
    return user;
  }
}
