import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ManualHttpException } from '@common/error';
import { NoJwtToken } from '@common/jwtToken';
import { AuthService } from './auth.service';
import { createPass } from '@common/crypto';
import { Users } from '@mysql/users';

@NoJwtToken()
@ApiTags('Auth 登录/注册')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto) {
    const verifyPass = createPass(body.user, body.pass);
    const userInfo = await Users.getInfoKeys({ email: body.user, pass: verifyPass });
    if (!userInfo) return ManualHttpException('账号或密码错误');
    const status = this.authService.verifyUserState(userInfo.status);
    if (status) return ManualHttpException(status);
    return await this.authService.login(userInfo, body.tags || 'web');
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: RegisterDto) {
    return 'register';
    // return await this.authService.register(body);
  }

  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout() {
    return 'logout';
    // return await this.authService.logout();
  }

  @Post('refresh')
  @ApiOperation({ summary: '刷新token' })
  async refresh() {
    return 'refresh';
    // return await this.authService.refresh();
  }

  @Get('hasToken')
  @ApiOperation({ summary: 'token 是否有效' })
  async hasToken() {
    return 'hasToken';
    // return await this.authService.hasToken();
  }

  @Get('code')
  @ApiOperation({ summary: '获取验证码' })
  async code() {
    return 'code';
    // return await this.authService.code();
  }
}
