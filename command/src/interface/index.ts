export interface commandOptions {
  // 全名
  flags: string;

  // 别名
  alias?: string;

  // 参数
  values?: string;

  // 默认值
  default?: any;

  // 简介
  description?: string;

  // 参数处理
  handler?(...args: any[]): any;

  // 激活触发
  command?(...args: any[]): void;
}
