import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { registerAs } from '@nestjs/config';

/* 声明 */
export interface AppOptions{
  port: number;
  swagger: string;
  pipes?: ValidationPipeOptions;
}

/* 配置名 */
export const AppName = 'appSystem';

/* 配置 */
export const AppConfig = registerAs(AppName, (): AppOptions => {
  return {
    port: 9871,
    swagger: '1',
    pipes: {
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    },
  };
});
