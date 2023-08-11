import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  Inject,
} from '@eggjs/tegg';
import Response from 'app/core/Response';
import { UserService } from 'app/service/UserService';
import { EggLogger } from 'egg';
import { UserVo, UserVoRule } from './vo/UserVo';

// TODO: 使用中间件捕获异常
@HTTPController({
  path: '/',
})
export class UserController {
  @Inject()
  private readonly logger: EggLogger;

  @Inject()
  private readonly userService: UserService;

  @HTTPMethod({
    path: '/register',
    method: HTTPMethodEnum.POST,
  })
  async register(@Context() ctx: EggContext, @HTTPBody() userVo: UserVo) {
    this.logger.info('register user: %s', userVo.username);
    try {
      ctx.tValidate(UserVoRule, userVo);
    } catch (e: any) {
      this.logger.error(
        'register user: %s, error: %s',
        userVo.username,
        e.message,
      );
      return Response.badRequest('参数错误');
    }
    try {
      await this.userService.register(userVo);
    } catch (e: any) {
      this.logger.error(
        'register user: %s, error: %s',
        userVo.username,
        e.message,
      );
      return Response.badRequest('重复用户名');
    }
    return Response.success();
  }

  @HTTPMethod({
    path: '/login',
    method: HTTPMethodEnum.POST,
  })
  async login(@Context() ctx: EggContext, @HTTPBody() userVo: UserVo) {
    this.logger.info('register user: %s', userVo.username);
    try {
      ctx.tValidate(UserVoRule, userVo);
    } catch (e: any) {
      this.logger.error(
        'register user: %s, error: %s',
        userVo.username,
        e.message,
      );
      return Response.badRequest('参数错误');
    }
    try {
      const res = await this.userService.login(userVo.username, userVo.password);
      return Response.success(res);
    } catch (e: any) {
      this.logger.error(
        'register user: %s, error: %s',
        userVo.username,
        e.message,
      );
      return Response.badRequest(e.message);
    }
  }
}
