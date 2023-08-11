import { AccessLevel, ContextProto, Inject, EggContext } from '@eggjs/tegg';
import { EggLogger } from 'egg';
import { RedisUtil } from './util/RedisUtil';
import * as JWTUtil from './util/JWTUtil';
import { EggAppConfig } from 'typings/app';

@ContextProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class UserManager {
  @Inject()
  private readonly logger: EggLogger;

  @Inject()
  private readonly config: EggAppConfig;

  @Inject()
  private readonly redisUtil: RedisUtil;

  async getAuthorizedUserId(ctx: EggContext) {
    if (ctx.uid) {
      return ctx.uid;
    }

    const autorization = ctx.get('Authorization');
    if (!autorization) {
      return null;
    }
    this.logger.info('get Authorization', autorization);

    const user = await this.loadUserFromRedis(autorization);
    if (user) {
      ctx.uid = user.uid;
      this.logger.debug('load user from redis ', user);
      return user.uid;
    }

    const uid = await JWTUtil.verifyToken(autorization, this.config.jwt.secret);
    if (!uid) {
      return null;
    }
    this.logger.debug('verify token', uid);
    ctx.uid = uid;
    return uid;
  }

  private async loadUserFromRedis(token: string) {
    const userJSON = await this.redisUtil.get(`TOKEN_${token}`);
    if (!userJSON) {
      return null;
    }
    return JSON.parse(userJSON);
  }
}
