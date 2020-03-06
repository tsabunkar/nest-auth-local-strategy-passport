export declare type User = any;
export declare class UsersService {
    private readonly users;
    constructor();
    findOneUser(username: string): Promise<User | undefined>;
}
