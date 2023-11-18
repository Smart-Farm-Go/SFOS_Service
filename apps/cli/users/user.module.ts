import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { Users } from '@mysql/users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
})
export class UserModule {}
