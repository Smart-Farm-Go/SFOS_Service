import { SetMetadata } from '@nestjs/common';
import { NoJwtTokenName } from '@app/libs/jwtToken/src/config';

/* 跳过 Jwt Token 验证 */
export const NoJwtToken = () => SetMetadata(NoJwtTokenName, true);

export * from './src/jwtToken.guard';
export * from './src/jwtToken.module';
export * from './src/jwtToken.strategy';
export { JwtTokenFromRequest } from './src/config';
