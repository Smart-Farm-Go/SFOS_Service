import { ResponseInterceptor } from './src/response.interceptor';
import { INestApplication } from '@nestjs/common';

/* 拦截器 */
export const useInterceptor = (app: INestApplication) => {
  app.useGlobalInterceptors(new ResponseInterceptor());
};
