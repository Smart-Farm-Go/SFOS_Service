import { NoJwtTokenName } from './src/config';
import { SetMetadata } from '@nestjs/common';

/* 跳过 Jwt Token 验证 */
export const NoJwtToken = () => SetMetadata(NoJwtTokenName, true);

export * from './src/jwtToken.module';
export { JwtTokenFromRequest } from './src/config';
