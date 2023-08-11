export enum RoleEnum {
  // 可读
  READER = 0,
  // 可读写
  WRITER = 1,
  // 管理员，可管理项目成员
  ADMIN = 2,
  // 项目所有者，可删除项目
  OWNER = 3,
}

export default interface UserBo {
  uid: bigint;
  username: string;
  role: number;
}
