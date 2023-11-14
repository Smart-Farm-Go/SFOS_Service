import { ConfigFactory } from '@nestjs/config/dist/interfaces/config-factory.interface';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* 配置 */
export class ConfigGlobal {
  static use(...load: ConfigFactory[]): DynamicModule {
    return ConfigModule.forRoot({ isGlobal: true, load });
  }
}

export * from './src/app.config';
export * from './src/middleware.config';
