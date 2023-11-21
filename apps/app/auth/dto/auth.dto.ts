import { IsAlphanumeric, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 登录
export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ description: '账号/邮箱' })
  user: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  pass: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '标签' })
  tags: string;
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
