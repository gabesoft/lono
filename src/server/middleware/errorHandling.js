import type { Context } from 'koa';

export default () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  };
};