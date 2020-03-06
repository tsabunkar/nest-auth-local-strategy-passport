import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateLoggedInUser(username: string, pass: string): Promise<any>;
    checkLogin(user: any): Promise<{
        access_token: string;
    }>;
}
