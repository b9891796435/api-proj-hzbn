import { EggContext, Next } from '@eggjs/tegg';
import Response, { ResponseCode } from '../Response';

export async function ErrorHandlerMiddleware(ctx: EggContext, next: Next) {
  try {
    await next();
  } catch (error: any) {
    const { name, code, message } = error;
    ctx.logger.error(name, message);
    // 如果是业务异常，直接返回
    if (name === 'BusinessException') {
      ctx.body = new Response(code, message);
      return;
    } else if (message.includes('Validation Failed')) {
      // 处理参数校验错误
      ctx.body = new Response(ResponseCode.BAD_REQUEST, '参数错误');
      return;
    }
    // 否则隐藏错误信息
    ctx.body = Response.serverError();
  }
}
