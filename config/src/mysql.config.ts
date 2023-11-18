import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

/* 声明 */
export type MysqlConfigOptions = TypeOrmModuleOptions

/* 配置名 */
export const MysqlConfigName = 'Mysql_Config_Name';

/* 配置 */
export const MysqlConfig = registerAs(MysqlConfigName, (): MysqlConfigOptions => {
  return {
    port: 3306,
    type: 'mysql',
    charset: 'utf8',
    host: '127.0.0.1',
    database: process.env['MYSQL_DB'],
    username: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASS'],
    //
    debug: false,
    retryDelay: 5000,
    synchronize: true,
    retryAttempts: 10,
    logging: ['query'],
    logger: 'simple-console',
  };
});
