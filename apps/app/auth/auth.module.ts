import { JwtTokenModule } from '@libs/jwtToken';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

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
  providers: [AuthService],
})
export class AuthModule {}
