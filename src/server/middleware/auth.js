import config from 'config';
import gauth from 'google-auth-library';

import type { Context } from 'koa';

const CLIENT_ID = config.get('google.clientId');
const API_PATTERN = /^\/api\//;

const auth = new gauth.OAuth2Client(CLIENT_ID, '', '');

const getIdToken = (ctx: Context) => {
  if (!ctx.header || !ctx.header.authorization) {
    return null;
  }

  const parts = ctx.header.authorization.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
  }

  return null;
};

export default () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    const idToken = getIdToken(ctx);
    const requiresAuth = API_PATTERN.test(ctx.url);

    if (requiresAuth && !idToken) {
      ctx.throw(401, 'Authorization header not found or bad format.');
    }

    if (idToken) {
      try {
        const token = await auth.verifyIdToken({ idToken });
        ctx.state.auth = token.payload;
      } catch (err) {
        ctx.throw(401, err.message);
      }
    }

    await next();
  };
};