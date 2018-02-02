import config from 'config';
import redis from 'redis';
import request from 'request-promise-native';
import util from 'util';

import type { Context } from 'koa';

const redisPort = config.get('redis.port');
const redisHost = config.get('redis.host');

const apiHost = config.get('api.host');
const userttl = config.get('user.ttl');

export default () => {
  const client = redis.createClient(redisPort, redisHost)
  const redisGet = util.promisify(client.get).bind(client);
  const redisSet = util.promisify(client.set).bind(client);

  const getUser = async (email: string) => {
    const opts = {
      uri: `${apiHost}/users?where=(email eq "${email}")`,
      json: true
    };

    const users = await request(opts);
    if (users.length > 0) {
      await redisSet(email, JSON.stringify(users[0]), 'EX', userttl);
    }

    return users[0];
  };

  const createUser = async (auth) => {
    const opts = {
      uri: `${apiHost}/users?where=(email eq "${auth.email}")`,
      method: 'POST',
      json: true,
      body: {
        email: auth.email,
        disabled: false,
        admin: false,
        name: auth.name,
        givenName: auth.given_name,
        familyName: auth.family_name,
        locale: auth.locale,
        imageUrl: auth.picture
      }
    };

    const user = await request(opts);
    await redisSet(auth.email, JSON.stringify(user), 'EX', userttl);
    return user;
  };

  return async (ctx: Context, next: () => Promise<void>) => {
    if (!ctx.state.auth) {
      return await next();
    }

    const auth = ctx.state.auth;
    const email = auth.email;
    const userFromCacheRaw = await redisGet(email);
    const userFromCache = JSON.parse(userFromCacheRaw);
    if (userFromCache) {
      ctx.state.user = userFromCache;
      return await next();
    }

    const userFromDb = await getUser(email);
    if (userFromDb) {
      ctx.state.user = userFromDb;
      return await next();
    }

    const newUser = await createUser(auth);
    ctx.state.user = newUser;

    await next();
  };
};