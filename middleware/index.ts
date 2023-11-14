import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { useTraceIdMiddleware } from './src/TraceId.middleware';
import { MiddlewareOptions, MiddlewareName } from '@app/config';

/* 中间件 */
export const useMiddleware = (app: INestApplication) => {
  /* 配置 */
  const configService = app.get(ConfigService);
  const config = configService.get<MiddlewareOptions>(MiddlewareName);
  /* 跟踪ID */
  app.use(useTraceIdMiddleware(config.traceId || 'traceId'));
};
