import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/* 响应声明 */
export interface ResponseDto<T = any> {
  data?: T;
  code: number;
}

/* 响应拦截器 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto> | Promise<Observable<ResponseDto>> {
    return next.handle().pipe(map((context): ResponseDto => {
      return { code: 0, data: context };
    }));
  }
}
