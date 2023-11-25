/* 状态 */
export enum UserState {
  /* 检测 */
  CHECKING = -1,

  /* 禁用 */
  DISABLE = 0,

  /* 启用 */
  ENABLE = 1,

  /* 锁定 */
  LOCKED = 2,

  /* 删除 */
  DELETED = 3,
}

/* 设置状态 */
export enum SettingsState {
  /* 启用 */
  ENABLE = 1,

  /* 禁用 */
  DISABLE = 0,
}

/* 设置权限 */
export enum SettingsPermissionState {
  /* 权限 */
  PERMISSION = 1,

  /* 游客 */
  GUEST = 2,

  /* 登录 */
  LOGIN = 3,

  /* 管理员 */
  ADMIN = 4,
}
