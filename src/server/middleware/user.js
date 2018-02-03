import config from 'config';

import api from '../services/api';
import redis from '../services/redis';

import type { Auth } from 'types/Auth';
import type { Context } from 'koa';
import type { User } from 'types/User';

const userttl = config.get('user.ttl');
const errorPat = /email_unique/;

export default () => {
  const getAndCache = async (email: string): Promise<User> => {
    const user = await api.getUser(email);

    if (user) {
      await redis.setVal(email, user, userttl);
    }

    return user;
  };

  const createAndCache = async (auth: Auth): Promise<User> => {
    try {
      const user = await api.createUser({
        email: auth.email,
        disabled: false,
        admin: false,
        name: auth.name,
        givenName: auth.given_name,
        familyName: auth.family_name,
        locale: auth.locale,
        imageUrl: auth.picture
      });
      await redis.setVal(auth.email, user, userttl);
      return user;
    } catch (err) {
      if (errorPat.test(err.message)) {
        return await getAndCache(auth.email);
      }

      throw err;
    }
  };

  return async (ctx: Context, next: () => Promise<void>) => {
    if (!ctx.state.auth) {
      return await next();
    }

    const auth: Auth = ctx.state.auth;
    const email: string = auth.email;
    const userFromCache: User = await redis.getVal(email);
    if (userFromCache) {
      ctx.state.user = userFromCache;
      return await next();
    }

    const userFromDb: User = await getAndCache(email);
    if (userFromDb) {
      ctx.state.user = userFromDb;
      return await next();
    }

    const newUser: User = await createAndCache(auth);
    ctx.state.user = newUser;

    await next();
  };
};