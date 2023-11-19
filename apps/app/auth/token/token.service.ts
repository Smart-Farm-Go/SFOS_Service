import { Injectable } from '@nestjs/common';
import { TokenOptions } from './interface';
import { RedisService } from 'libs/redis';
import { JwtService } from '@nestjs/jwt';
import * as IoRedis from 'ioredis';

@Injectable()
export class tokenService {
  private redis: IoRedis.Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.connect();
  }

  private getTime() {
    const time = new Date();
    const state = time.getTime();
    time.setHours(time.getHours() + 12);
    const expires = time.getTime();
    time.setHours(time.getHours() + 12);
    return { state, expires, end: time.getTime() };
  }

  /* 创建令牌 */
  createToken(userInfo: any, tags = 'web'): TokenOptions {
    const { state, expires, end } = this.getTime();
    const accessToken = this.jwtService.sign({ ...userInfo, tags, state, expires }, { expiresIn: '12h' });
    const refreshToken = this.jwtService.sign({ ...userInfo, tags, state, expires, end }, { expiresIn: '1d' });
    return { accessToken, refreshToken, accessExpires: expires, refreshExpires: end };
  }

  async hasToken() {

  }

  /* token 添加到 redis */
  async setToken(uid: number, tags: string, token: TokenOptions) {
    const accessKey = `${uid}:${tags}:access`;
    const tokensKey = `${uid}:${tags}:tokens`;
    const refreshKey = `${uid}:${tags}:refresh`;
    await this.handlerExpiresToken(accessKey, refreshKey, tokensKey);
    await this.redis.hset(tokensKey, token.refreshToken, token.accessToken);
    await this.redis.hset(tokensKey, token.accessToken, token.refreshToken);
    await this.redis.zadd(accessKey, token.accessExpires, token.accessToken);
    await this.redis.zadd(refreshKey, token.refreshExpires, token.refreshToken);
  }

  /* 处理过期的 token */
  private async handlerExpiresToken(access: string, refresh: string, tokens: string) {
    // 处理超时
  }

  async delToken() {

  }
}
