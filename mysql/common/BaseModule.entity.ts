import { Entity, BaseEntity, UpdateDateColumn, PrimaryGeneratedColumn, CreateDateColumn, Repository, EntityManager, FindOptionsWhere, FindOptionsSelect, DeleteResult, UpdateResult, In, Not } from 'typeorm';
import { PaginationRequest } from '@common/pagination';

@Entity()
export abstract class BaseModule extends BaseEntity {
  /* 主键 */
  @PrimaryGeneratedColumn({ type: 'int' }) id: number;

  /* 创建时间 */
  @CreateDateColumn({ type: 'datetime', default: null }) create_time: Date;

  /* 更新时间 */
  @UpdateDateColumn({ type: 'datetime', default: null }) update_time: Date;

  /** 根据 `where` 获取多条数据
   * 创建一个方法，可能没用
   */
  static getKeys<T extends BaseModule>(this: { new(): T } & typeof BaseModule, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>): Promise<T[]> {
    return this.getRepository().find({ where, select }) as Promise<T[]>;
  }

  /** 根据 `where` 获取一条数据
   * 创建一个方法，可能没用
   */
  static getInfoKeys<T extends BaseModule>(this: { new(): T } & typeof BaseModule, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>): Promise<T> {
    return this.getRepository().findOne({ where, select }) as Promise<T>;
  }

  /** 根据 `where` 查询是否有数据
   * 创建一个方法，可能没用
   */
  static async hasKeys<T extends BaseModule>(this: { new(): T } & typeof BaseModule, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<boolean> {
    return Boolean(await this.getRepository().findOneBy(where));
  }

  /* 事务聚合 */
  static async transaction<T extends BaseModule, V extends any>(this: { new(): T } & typeof BaseModule, handler: (query: EntityManager, repository: Repository<T>) => Promise<V>): Promise<V> {
    const queryRunner = this.getRepository().metadata.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const repository = manager.getRepository(this) as Repository<T>;
      const result = await handler(manager, repository);
      await queryRunner.commitTransaction();
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction failed');
    } finally {
      await queryRunner.release();
    }
  }

  /* where 处理 */
  protected abstract handleWhere(): { [Label: string]: { name?: string, handle?: any } }

  static handleWhere<T extends BaseModule>(this: { new(): T } & typeof BaseModule, data: any): { [Name: string]: any } {
    if ('handleWhere' in this.prototype) {
      const whereObj = this.prototype.handleWhere();
      return Object.entries<{ name?: string; handle?: any }>(whereObj).reduce(function (value, obj) {
        const [keys, { name, handle }] = obj;
        if (keys in data) value[name || keys] = handle ? handle(data[keys]) : data[keys];
        return value;
      }, {});
    }
    //
    return {};
  }

  /* 验证一些东西 */
  static async hasVerify<T extends BaseModule>(this: { new(): T } & typeof BaseModule, data: any, id?: number): Promise<{ status: boolean, message: string }> {
    const where = this.handleWhere(data);

    if (id) {
      if (id < 1) return { status: false, message: '参数错误' };
      if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };
      where.id = Not(id);
    }

    if (await this.hasKeys(where)) return { status: false, message: '重复的参数' };

    return { status: true, message: '' };
  }

  /* 添加数据 */
  static async addData<T extends BaseModule>(this: { new(): T } & typeof BaseModule, data: T): Promise<{ status: boolean; message: string; data?: T }> {
    const verify = await this.hasVerify(data);
    if (!verify.status) return verify as { status: false, message: string };
    //
    return { status: true, data: await this.getRepository().save(data), message: '' };
  }

  /* 修改数据 */
  static async saveData<T extends BaseModule>(this: { new(): T } & typeof BaseModule, id: number, data: any): Promise<{ status: boolean; message: string; data?: UpdateResult }> {
    const verify = await this.hasVerify(data, id);
    if (!verify.status) return verify as { status: false; message: string };
    //
    return { status: true, data: await this.getRepository().update({ id }, data), message: '' };
  }

  /* 删除数据 */
  static async removeData<T extends BaseModule>(this: { new(): T } & typeof BaseModule, ids: number[]): Promise<{ status: boolean; message: string; data?: DeleteResult }> {
    const id = In([...new Set(ids)]);
    if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };
    return { status: true, data: await this.getRepository().delete({ id }), message: '' };
  }

  /* 列表数据 */
  static async getList<T extends BaseModule>(this: { new(): T } & typeof BaseModule, page: PaginationRequest, where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, handlerList?: (list: T[]) => (any[] | Promise<any[]>)) {
    const { order, pageSize: take, pageSkip: skip } = page;
    const count = await this.getRepository().countBy(where);
    const list = await this.getRepository().find({ where, order, skip, take });
    return { count, list: (handlerList && (await handlerList(<T[]>list))) || list };
  }
}
