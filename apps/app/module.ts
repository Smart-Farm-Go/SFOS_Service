import { AppConfig, AppName, AppOptions, ConfigGlobal, MiddlewareConfig } from '@app/config';
import { Module, ValidationPipeOptions } from '@nestjs/common';
import { LoggerModule } from '@app/libs/logger';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@app/libs/redis';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigGlobal.use(AppConfig, MiddlewareConfig),
    LoggerModule,
    RedisModule.forRoot({}, true),
    UsersModule,
  ],
})
export class AppModule {
  static port: number;

  static swaggerVersion: string;

  static pipesVerify: ValidationPipeOptions;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<AppOptions>(AppName);
    AppModule.swaggerVersion = config.swagger;
    AppModule.pipesVerify = config.pipes;
    AppModule.port = config.port;
  }
}
