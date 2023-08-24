import crypto from 'crypto';
import { AccessLevel, SingletonProto, Inject } from '@eggjs/tegg';
import { UserDao } from 'app/dao/UserDao';
import UserDto from './dto/UserDto';
import * as JWTUtil from 'app/core/util/JWTUtil';
import UserBo from 'app/dao/bo/UserBo';
import { RedisUtil } from 'app/core/util/RedisUtil';
import BusinessException from 'app/core/BusinessException';
import { ResponseCode } from 'app/core/Response';
import { AbstractService } from './AbstractService';

@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService extends AbstractService {

  @Inject()
  private readonly redisUtil: RedisUtil;

  @Inject()
  private readonly userDao: UserDao;

  async findById(id: bigint) {
    this.logger.info('findById', id);
    return await this.userDao.findById(id);
  }

  async register(userDto: UserDto) {
    const salt = crypto.randomBytes(30).toString('hex');
    const plain = `${salt}${userDto.password}`;
    const passwordIntegrity = JWTUtil.integrity(plain);
    userDto.password = passwordIntegrity;

    try {
      const user = await this.userDao.save(userDto, salt);
      this.logger.info('register user: %s', user.username);
      return {
        uid: user.uid,
        username: user.username,
      };
    } catch {
      throw new BusinessException(
        ResponseCode.DUPLICATE_RESOURCE,
        '用户名已被注册',
      );
    }
  }

  async login(username: string, password: string) {
    const userBo = await this.userDao.findByUsername(username);
    if (!userBo) {
      throw new BusinessException(ResponseCode.NOT_FOUND, '用户不存在');
    }
    if (!this.verifyPassword(userBo, password)) {
      throw new BusinessException(ResponseCode.INVALID_PASSWORD, '密码错误');
    }
    const { secret, expiresIn } = this.config.jwt;
    const token = JWTUtil.createToken(userBo.uid, secret, expiresIn);
    this.saveUserToRedis(token, userBo);
    return {
      token,
      uid: userBo.uid,
      username: userBo.username,
    };
  }

  public async saveUserToRedis(token: string, user: UserBo) {
    await this.redisUtil.set(`TOKEN_${token}`, JSON.stringify(user));
  }

  private verifyPassword(user: UserBo, password: string) {
    const plain = `${user.salt}${password}`;
    return JWTUtil.verify(plain, user.password);
  }
}
