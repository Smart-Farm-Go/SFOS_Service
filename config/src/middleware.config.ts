import { registerAs } from '@nestjs/config';

/* 声明 */
export interface MiddlewareOptions {
  traceId?: string;
}

/* 配置名 */
export const MiddlewareName = 'MiddlewareName';

/* 配置 */
export const MiddlewareConfig = registerAs(MiddlewareName, (): MiddlewareOptions => {
  return {};
});
