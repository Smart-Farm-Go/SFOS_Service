import { tokenService } from './token/token.service';
import { AuthController } from './auth.controller';
import { JwtTokenOptions } from '@common/jwtToken';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenName } from '@config';
// Mysql
import { Users, UsersConfig } from '@mysql/users';
import { Settings } from '@mysql/settings';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersConfig, Settings]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const conf = configService.get<JwtTokenOptions>(JwtTokenName);
        return { secret: conf.secretOrKey };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, tokenService],
})
export class AuthModule {}
