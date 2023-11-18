import { AppService } from './app/app.service';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';

/* 引导 */
async function bootstrap() {
  /* 初始化 */
  const app = await NestFactory.create(AppModule, { logger: false });
  try {
    /* 模块 -> 方法 -> 执行 */
    app.select(AppModule).get(AppService).run();
    /* 关闭 */
    await app.close();
  } catch (e) {
    await app.close();
    process.exit(1);
  }
}

/* 运行 */
bootstrap();
