import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  Inject,
} from '@eggjs/tegg';
import { UserService } from 'app/service/UserService';
import { EggLogger } from 'egg';

// TODO: 使用中间件捕获异常
@HTTPController({
  path: '/users',
})
export class UserController {
  @Inject()
  private readonly logger: EggLogger;

  @Inject()
  private readonly userService: UserService;

  @HTTPMethod({
    path: '/:id',
    method: HTTPMethodEnum.GET,
  })
  async getUser(@HTTPParam() id: bigint) {
    this.logger.info('getUser by id: %s', id);
    const user = await this.userService.findById(id);
    // TODO：封装一个统一的返回格式
    if (!user) {
      return {
        code: 404,
        message: 'User not exist',
        data: null,
      };
    }
    return {
      code: 200,
      message: 'success',
      data: user,
    };
  }
}
