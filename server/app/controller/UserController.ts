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
import { UserVo, UserVoRule } from './vo/UserVo';
import { AbstractController } from './AbstractController';

@HTTPController({
  path: '/',
})
export class UserController extends AbstractController {
  @Inject()
  private readonly userService: UserService;

  @HTTPMethod({
    path: '/register',
    method: HTTPMethodEnum.POST,
  })
  async register(@Context() ctx: EggContext, @HTTPBody() userVo: UserVo) {
    this.logger.info('register user: %s', userVo.username);
    ctx.tValidate(UserVoRule, userVo);
    const user = await this.userService.register(userVo);
    return Response.success(user);
  }

  @HTTPMethod({
    path: '/login',
    method: HTTPMethodEnum.POST,
  })
  async login(@Context() ctx: EggContext, @HTTPBody() userVo: UserVo) {
    this.logger.info('register user: %s', userVo.username);
    ctx.tValidate(UserVoRule, userVo);
    const response = await this.userService.login(
      userVo.username,
      userVo.password,
    );
    return Response.success(response);
  }
}
