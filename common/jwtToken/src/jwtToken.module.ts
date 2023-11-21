import { JwtTokenStrategy } from './jwtToken.strategy';
import { JwtTokenGuard } from './jwtToken.guard';
import { StrategyOptions } from 'passport-jwt';
import { JwtTokenOptions } from './config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

export type JwtTokenOptions = Partial<StrategyOptions> & {
  secretOrKey: string;
}

@Module({
  providers: [
    JwtService,
    JwtTokenStrategy,
    { provide: APP_GUARD, useClass: JwtTokenGuard },
  ],
  exports: [JwtService],
})
export class JwtTokenModule {
  static forRoot(options: JwtTokenOptions) {
    return {
      module: JwtTokenModule,
      providers: [{ provide: JwtTokenOptions, useValue: options }],
    };
  }

  static forRootAsync(options: { inject: any[], useFactory: (...arg: any[]) => JwtTokenOptions | Promise<JwtTokenOptions> }) {
    return {
      module: JwtTokenModule,
      providers: [{ provide: JwtTokenOptions, inject: options.inject || [], useFactory: options.useFactory }],
    };
  }
}
