import { JwtAuthGuardName, JwtTokenFromRequest, NoJwtTokenName } from './config';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

/* jwt 网关 */
@Injectable()
export class JwtTokenGuard extends AuthGuard(JwtAuthGuardName) {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {super();}

  async canActivate(context: ExecutionContext): Promise<any> {
    // 处理 jwt token
    this.handlerJwtToken(context);

    // 公共接口
    if (this.isPublic(context)) return true;

    const canActivate = await super.canActivate(context);

    console.log('canActivate', canActivate);

    return canActivate;
  }

  handlerJwtToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request['user']) return request['user'];
    // 获取令牌
    const token = JwtTokenFromRequest(request);
    if (token) {
      // 令牌信息写入
      request['user'] = this.jwtService.decode(token) || undefined;
    }
    // 返回值
    return request['user'];
  }

  isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(NoJwtTokenName, [context.getHandler(), context.getClass()]);
  }
}
