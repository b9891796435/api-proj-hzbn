import {
  Context,
  EggContext,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
} from '@eggjs/tegg';
import { AbstractController } from './AbstractController';
import Response from 'app/core/Response';

@HTTPController({
  path: '/',
})
export class MockController extends AbstractController {

  @HTTPMethod({
    path: '/run',
    method: HTTPMethodEnum.POST,
  })
  async run(@Context() ctx: EggContext,) {
    const headers = ctx.request.headers;
    const path = headers['hzbn-path'];
    if (!path || typeof path !== 'string') {
      return Response.badRequest('path is required');
    }
    const method = headers['hzbn-method'];
    if (!method || typeof method !== 'string' || !HTTPMethodEnum[method]) {
      return Response.badRequest('method is required');
    }
    const cookie = headers['hzbn-cookie'];
    if (!cookie || typeof cookie !== 'string') {
      return Response.badRequest('cookie is required');
    }
    const res = await ctx.curl(path, {
      method: HTTPMethodEnum[method],
      data: ctx.request.body,
      headers: {
        ...ctx.request.headers,
        cookie,
      },
    });

    return res.res;
  }
}
