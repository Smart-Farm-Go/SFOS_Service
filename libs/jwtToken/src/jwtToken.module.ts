import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtTokenStrategy } from '@app/libs/jwtToken/src/jwtToken.strategy';
import { JwtTokenGuard } from '@app/libs/jwtToken/src/jwtToken.guard';
import { JwtTokenOptions } from '@app/libs/jwtToken/src/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
