import { tokenService } from './token/token.service';
import { UserState } from '@mysql/interface';
import { Injectable } from '@nestjs/common';
import { reWriteObj } from '@utils/object';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@mysql/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: tokenService,
  ) {}

  verifyUserState(status: UserState) {
    switch (status) {
      case UserState.LOCKED:
        return '用户已被锁定';
      case UserState.DELETED:
        return '用户已被删除';
      case UserState.CHECKING:
        return '用户正在审核中';
      case UserState.DISABLE:
        return '用户已被禁用';
      default:
        return '';
    }
  }

  async login(userInfo: Users, tags: string) {
    const payload = reWriteObj(userInfo, ['uid', 'name', 'email', 'phone', 'avatar', 'signature']);
    const token = this.tokenService.createToken(payload, tags);
    await this.tokenService.setToken(userInfo.uid, tags, token);
    return Object.assign({}, payload, token);
  }
}
