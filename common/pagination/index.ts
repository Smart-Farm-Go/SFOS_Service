import { PaginationRequest } from './src/decorators';

/* 分页响应声明 */
export interface PaginationResponse<T = any> extends PaginationRequest {
  maxPage?: number;
  hasNext: boolean;
  total: number;
  list: T[];
}

/* 分页静态方法 */
export class Pagination {
  static of<T = any>(page: PaginationRequest, total: number, list: T[]): PaginationResponse<T> {
    let pageOrder = {};

    const { pageSize, pageCount, order, params } = page;

    const maxPage = pageSize ? Math.floor(total / pageSize) + (total % pageCount ? 1 : 0) : undefined;

    if (order) {
      const orderBy = Object.keys(order)[0];
      pageOrder = { orderBy, orderKey: order[orderBy] };
    }

    return { ...pageOrder, params, pageSize, pageCount, hasNext: pageCount < maxPage, maxPage, total, list };
  }
}

export * from './src/decorators';
