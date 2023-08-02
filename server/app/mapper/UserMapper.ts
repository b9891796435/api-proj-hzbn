import { Attribute, Model } from '@eggjs/tegg/orm';
import { Bone, DataTypes } from 'leoric';

// HINT：默认情况下，表名是类名的 snake_case 形式，这里我们指定表名为 users
@Model({
  tableName: 'users',
})
export class UserMapper extends Bone {
  // TODO：此处 Attributte 第一个参数类型不匹配，但是不影响运行
  // 可能是 leoric 和 tegg-orm 的版本不匹配导致的
  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
    autoIncrement: true,
  })
  id: bigint;

  @Attribute(DataTypes.STRING(32) as any)
  name: string;

  @Attribute(DataTypes.STRING(32) as any)
  password: string;
}
