import { BaseModule } from '../common/BaseModule.entity';
import { Column, Entity, Unique } from 'typeorm';
import { UserState } from '../interface';

@Entity()
@Unique('UNIQUE', ['uid', 'email', 'phone'])
export class Users extends BaseModule {
  /* uid */
  @Column({ type: 'int', width: 10 }) uid: number;

  /* 昵称 */
  @Column({ type: 'varchar', length: 60 }) name: string;

  /* 密码 */
  @Column({ type: 'varchar', length: 200 }) pass: string;

  /* 邮箱 */
  @Column({ type: 'varchar', length: 100 }) email: string;

  /* 手机号 */
  @Column({ type: 'varchar', length: 20, nullable: true }) phone: string;

  /* 头像 */
  @Column({ type: 'varchar', length: 200, nullable: true }) avatar: string;

  /* 签名 */
  @Column({ type: 'varchar', length: 200, nullable: true }) signature: string;

  /* 状态 */
  @Column({ type: 'enum', enum: UserState, default: UserState.ENABLE }) status: number;

  /* where 处理 */
  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
