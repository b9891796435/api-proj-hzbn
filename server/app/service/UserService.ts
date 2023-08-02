import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { EggLogger } from 'egg';
import { UserDao } from 'app/dao/UserDao';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService {
  @Inject()
  private readonly logger: EggLogger;

  @Inject()
  private readonly userDao: UserDao;

  async findById(id: bigint) {
    this.logger.info('findById', id);
    return await this.userDao.findById(id);
  }
}
