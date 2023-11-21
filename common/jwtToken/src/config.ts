import { ExtractJwt } from 'passport-jwt';

/* 跳过验证名称 */
export const NoJwtTokenName = '_No_Jwt_Token_Name_';

/* 配置项 */
export const JwtTokenOptions = '_Jwt_Token_Options_';

/* 网关名称 */
export const JwtAuthGuardName = '_Jwt_Token_Guard_Name_';

/* 获取方法 */
export const JwtTokenFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromUrlQueryParameter('token'),
  ExtractJwt.fromAuthHeaderWithScheme('token'),
]);
