import type { Context } from 'koa';

const addResponseTime = async (ctx: Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};

export default () => {
  return addResponseTime;
};