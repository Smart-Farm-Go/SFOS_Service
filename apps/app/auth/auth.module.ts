import { tokenService } from './token/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtTokenOptions } from '@common/jwtToken';
import { JwtTokenName } from '@config';

@Module({
  imports: [
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
