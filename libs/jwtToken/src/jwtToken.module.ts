import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtTokenStrategy } from './jwtToken.strategy';
import { JwtTokenGuard } from './jwtToken.guard';
import { JwtTokenOptions } from './config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

export class JwtTokenModule {
  static forRoot(options: JwtModuleOptions) {
    return {
      module: JwtTokenModule,
      providers: [
        JwtTokenStrategy,
        { provide: APP_GUARD, useClass: JwtTokenGuard },
        { provide: JwtTokenOptions, useValue: options },
      ],
    };
  }

  static forRootAsync(options: { inject: any[], useFactory: () => JwtModuleOptions | Promise<JwtModuleOptions> }) {
    return {
      module: JwtTokenModule,
      providers: [
        JwtTokenStrategy,
        { provide: APP_GUARD, useClass: JwtTokenGuard },
        { provide: JwtTokenOptions, inject: options.inject || [], useFactory: options.useFactory },
      ],
    };
  }
}
