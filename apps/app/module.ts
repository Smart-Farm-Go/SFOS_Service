import { AppConfig, JwtTokenConfig, JwtTokenName, MiddlewareConfig, MysqlConfig } from '@config';
import { JwtTokenModule, JwtTokenOptions } from '@common/jwtToken';
import { Module, ValidationPipeOptions } from '@nestjs/common';
import { MysqlConfigName, MysqlConfigOptions } from '@config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppName, AppOptions } from '@config';
import { LoggerModule } from '@libs/logger';
import { RedisModule } from '@libs/redis';

// Mysql
import { Users, UsersConfig } from '@mysql/users';
import { Settings } from '@mysql/settings';

// Module
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, JwtTokenConfig, MysqlConfig, MiddlewareConfig],
    }),
    JwtTokenModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<JwtTokenOptions>(JwtTokenName);
      },
    }),
    RedisModule.forRoot({ retryTimes: 1000 }, true),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<MysqlConfigOptions>(MysqlConfigName);
        return Object.assign({ ...config }, {
          entities: [Users, UsersConfig, Settings],
        });
      },
    }),
    //
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  /* 程序端口 */
  static port: number;

  /* swagger 版本 */
  static swaggerVersion: string;

  /* 管道验证 */
  static pipesVerify: ValidationPipeOptions;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<AppOptions>(AppName);

    AppModule.swaggerVersion = config.swagger;

    AppModule.pipesVerify = config.pipes;

    AppModule.port = config.port;
  }
}
