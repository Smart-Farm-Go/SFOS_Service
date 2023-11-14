import { v4, validate } from 'uuid';
import { Request } from 'express';

/* 跟踪标识 */
export function useTraceIdMiddleware(traceId = 'traceId') {
  return function TraceIdMiddleware(req: Request, _: any, next: () => void) {
    const uuid = req.header(traceId) || v4();
    if (!validate(uuid)) {
      req.headers[traceId] = v4();
    }
    next();
  };
}
