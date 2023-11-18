import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtTokenStrategy } from './jwtToken.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtTokenGuard } from './jwtToken.guard';
import { JwtTokenOptions } from './config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    JwtService,
    JwtTokenStrategy,
    { provide: APP_GUARD, useClass: JwtTokenGuard },
  ],
  exports: [JwtService],
})
export class JwtTokenModule {
  static forRoot(options: JwtModuleOptions) {
    return {
      module: JwtTokenModule,
      imports: [JwtModule.register(options)],
      providers: [{ provide: JwtTokenOptions, useValue: options }],
    };
  }

  static forRootAsync(options: JwtModuleAsyncOptions) {
    return {
      module: JwtTokenModule,
      imports: [JwtModule.registerAsync(options)],
      providers: [{
        provide: JwtTokenOptions,
        inject: options.inject || [],
        imports: options.imports || [],
        useFactory: options.useFactory,
      }],
    };
  }
}
