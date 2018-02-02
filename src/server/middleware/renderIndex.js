import config from 'config';
import replaceStream from 'replacestream';
import send from 'koa-send';

import type { Context } from 'koa';

export default (publicDir: string) => {
  const clientId = config.get('google.clientId');

  return async (ctx: Context) => {
    await send(ctx, 'index.html', { root: publicDir });
    const stream: any = ctx.body;
    if (stream) {
      ctx.body = stream.pipe(replaceStream('GOOGLE_CLIENT_ID', clientId));
    }
  };
};