import { BaseModule } from '../common/BaseModule.entity';
import { Column, Entity, Index, Unique } from 'typeorm';
import { SettingsPermissionState, SettingsState } from '../interface';

@Entity()
@Unique('UNIQUE', ['keys'])
@Index('INDEX', ['tags', 'title'])
export class Settings extends BaseModule {
  /* 标签 */
  @Column({ type: 'varchar', length: 60 }) tags: string;

  /* 标题 */
  @Column({ type: 'varchar', length: 100 }) title: string;

  /* 标识 */
  @Column({ type: 'varchar', length: 200 }) keys: string;

  /* 内容 */
  @Column({ type: 'simple-json', nullable: true }) value: number;

  /* 备注 */
  @Column({ type: 'varchar', nullable: true }) remark: string;

  /* 描述 */
  @Column({ type: 'text', nullable: true }) description: string;

  /* 权限名称 */
  @Column({ type: 'varchar', nullable: true }) permissionName: string;

  /* 权限 */
  @Column({ type: 'enum', enum: SettingsPermissionState, default: SettingsPermissionState.LOGIN }) permission: number;

  /* 状态 */
  @Column({ type: 'enum', enum: SettingsState, default: SettingsState.ENABLE }) status: number;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
