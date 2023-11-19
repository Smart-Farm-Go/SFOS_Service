import { Command, CommandOptions, getNumUID, isEmail } from '@common/command';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '@mysql/users';

@Injectable()
@Command({ name: 'user', description: '用户管理' })
export class UserService {
  constructor(@InjectRepository(Users) private userRep: Repository<Users>) {}

  @CommandOptions([
    { flags: 'user', alias: 'u', values: '<email>', description: '用户邮箱' },
    { flags: 'pass', alias: 'p', values: '<password>', description: '用户密码' },
    { flags: 'create', alias: 'c', description: '创建用户', isCommand: true },
  ])
  async create({ user, pass }: { user: string, pass: string }) {
    if (!user) return console.log('user is required');
    if (!pass) return console.log('pass is required');
    if (!isEmail(user)) return console.log('user is not email');

    const uid = getNumUID(10);
    const users = new Users();
    users.email = user;
    users.pass = pass;
    users.name = user;
    users.uid = uid;

    await this.userRep.save(users);
    return console.log('create user success');
  }
}
