import { JwtTokenOptions } from '@common/jwtToken';
import { registerAs } from '@nestjs/config';

/* 配置名 */
export const JwtTokenName = '_Jwt_Token_Name_';

/* 配置 */
export const JwtTokenConfig = registerAs(JwtTokenName, (): JwtTokenOptions => {
  return {
    secretOrKey: 'xcvgbhnjmkiuytvbnhjm,k.ljmnhbmj',
  };
});
