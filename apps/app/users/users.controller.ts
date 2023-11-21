import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RedisService } from '@libs/redis';
import { ApiBasicAuth, ApiSecurity } from '@nestjs/swagger';

@Controller('users')
@ApiSecurity('basic')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  @ApiBasicAuth('basic')
  async findAll() {
    const redis = this.redisService.connect();
    if (redis) {
      return redis.get('test');
    }
    return 'redis no connect';
  }
}
