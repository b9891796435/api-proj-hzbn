import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  Inject,
} from '@eggjs/tegg';
import { EggLogger } from 'egg';

@HTTPController({
  path: '/users',
})
export class UserController {
  @Inject()
  private readonly logger: EggLogger;

  @HTTPMethod({
    path: '/:id',
    method: HTTPMethodEnum.GET,
  })
  async getUser(@HTTPParam() id: string) {
    this.logger.info('getUser', id);
    return {
      code: 200,
      message: 'success',
      data: {
        id,
        name: 'test',
      },
    };
  }
}
