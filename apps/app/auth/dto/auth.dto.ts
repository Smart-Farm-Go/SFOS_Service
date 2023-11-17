import { IsAlphanumeric, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 登录
export class LoginDto {
  @IsString()
  @ApiProperty({ description: '账号/邮箱' })
  user: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  pass: string;
}

// 注册
export class RegisterDto {
  @IsString()
  @ApiProperty({ description: '账号/邮箱' })
  user: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  pass: string;

  @IsString()
  @IsAlphanumeric()
  @ApiProperty({ description: '验证码' })
  code: string;
}
