import { NoJwtTokenName } from './src/config';
import { SetMetadata } from '@nestjs/common';

/* 跳过 Jwt Token 验证 */
export const NoJwtToken = () => SetMetadata(NoJwtTokenName, true);

export * from './src/jwtToken.guard';
export * from './src/jwtToken.module';
export * from './src/jwtToken.strategy';
export { JwtTokenFromRequest } from './src/config';
