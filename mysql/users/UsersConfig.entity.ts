import { BaseModule } from '../common/BaseModule.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UsersConfig extends BaseModule {
  /* uid */
  @Column({ type: 'int', width: 10 }) uid: number;

  /* 角色 */
  @Column({ type: 'varchar', length: 60, nullable: true }) role: string;

  /* 权限 */
  @Column({ type: 'varchar', length: 60, nullable: true }) permission: string;

  /* 登录限制*/
  @Column({ type: 'simple-json', nullable: true }) login_limit: string;

  /* 其他 */
  @Column({ type: 'text', nullable: true }) other: string;

  /* where 处理 */
  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
