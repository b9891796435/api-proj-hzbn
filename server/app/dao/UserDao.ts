import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { UserMapper } from 'app/mapper/UserMapper';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserDao {
  // HINT：通过 @Model 装饰器声明的类，其名称不会像其他组件一样转换成 camelCase
  // 所以这里我们需要通过 @Inject 装饰器指定名称
  @Inject({
    name: 'UserMapper',
  })
  private readonly userMapper: typeof UserMapper;

  async findById(id: bigint) {
    return await this.userMapper.findOne({ id });
  }
}
