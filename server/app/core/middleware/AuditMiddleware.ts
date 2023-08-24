import { EggContext, Next } from '@eggjs/tegg';
import { UserManager } from '../UserManager';
import Response from '../Response';

export async function AuditMiddleware(ctx: EggContext, next: Next) {
  // 登录和注册接口不需要校验
  if (isLoginOrRegister(ctx)) {
    await next();
    return;
  }

  const userManager = await ctx.getEggObject(UserManager);
  const uid = await userManager.getAuthorizedUserId(ctx);
  if (!uid) {
    ctx.body = Response.unauthorized('请先登录');
    return;
  }
  await next();
}

function isLoginOrRegister(ctx: EggContext) {
  return ctx.path === '/login' || ctx.path === '/register';
}
