import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RedisService } from '@app/libs/redis';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async findAll() {
    const redis = this.redisService.connect();
    if (redis) {
      return redis.get('test');
    }
    return 'redis no connect';
  }
}
