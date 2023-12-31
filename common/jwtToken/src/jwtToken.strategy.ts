import { JwtAuthGuardName, JwtTokenFromRequest, JwtTokenOptions } from './config';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, JwtAuthGuardName) {
  constructor(@Inject(JwtTokenOptions) opt: any) {
    super({ ...opt, jwtFromRequest: JwtTokenFromRequest });
  }

  async validate(payload: any) {
    console.log('validate', payload);
    return payload;
  }
}
