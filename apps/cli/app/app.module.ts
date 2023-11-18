import { MysqlConfig, MysqlConfigName, MysqlConfigOptions } from '@config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoModule } from '../crypto/crypto.module';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { Users } from '@mysql/users';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [MysqlConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<MysqlConfigOptions>(MysqlConfigName);
        return Object.assign({ ...config }, {
          entities: [Users],
        });
      },
    }),
    //
    UserModule,
    CryptoModule,
  ],
  providers: [ConfigService, AppService],
})
export class AppModule {}
