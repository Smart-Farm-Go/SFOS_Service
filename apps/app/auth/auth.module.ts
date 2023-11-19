import { JwtTokenModule } from '@libs/jwtToken';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { tokenService } from './token/token.service';

@Module({
  imports: [
    // JwtTokenModule.forRoot({ secret: 'secret' }),
    JwtTokenModule.forRootAsync({
      useFactory: () => {
        return { secret: 'secret' };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, tokenService],
})
export class AuthModule {}
