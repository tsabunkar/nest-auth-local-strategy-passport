import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  // So to that outside module can access this service : UsersService
  exports: [UsersService],
})
export class UsersModule {}
