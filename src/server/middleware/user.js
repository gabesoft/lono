import config from 'config';
import request from 'request-promise-native';

import RedisService from '../services/redis';

import type { Auth } from 'types/Auth';
import type { Context } from 'koa';
import type { User } from 'types/User';

const apiHost = config.get('api.host');
const userttl = config.get('user.ttl');

const usersUri = `${apiHost}/users`;

export default () => {
  const redis = new RedisService();

  const getAndCache = async (email: string): Promise<User> => {
    const opts = {
      uri: `${usersUri}?where=(email eq "${email}")`,
      json: true
    };

    const users = await request(opts);
    if (users.length > 0) {
      await redis.setVal(email, users[0], userttl);
    }

    return users[0];
  };

  const createAndCache = async (auth: Auth): Promise<User> => {
    const body = {
      email: auth.email,
      disabled: false,
      admin: false,
      name: auth.name,
      givenName: auth.given_name,
      familyName: auth.family_name,
      locale: auth.locale,
      imageUrl: auth.picture
    };
    const opts = {
      uri: usersUri,
      method: 'POST',
      json: true,
      body
    };

    try {
      const user = await request(opts);
      await redis.setVal(auth.email, user, userttl);
      return user;
    } catch (err) {
      const errorPat = /email_unique/

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