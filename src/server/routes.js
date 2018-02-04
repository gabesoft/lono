import posts from './data-posts';

import api from './services/api';

import type Router from 'koa-router';
import type { Context } from 'koa';

const perUserPaths = ['subscriptions', 'user-posts', 'tags'];

const addUser = (query: Object, userId: string): Object => {
  const whereUser = `(userId eq "${userId}")`;
  return Object.assign({}, query, {
    where: query.where ? `${query.where} and ${whereUser}` : whereUser
  });
};

const addUserIfNeeded = (path: string, query: Object, userId: string): Object => {
  return perUserPaths.includes(path) ? addUser(query, userId) : query;
};

export default (router: Router) => {
  router.get('/api/:path', async (ctx: Context) => {
    const path = ctx.params.path;
    const user = ctx.state.user;
    const query = addUserIfNeeded(path, ctx.query, user && user._id);
    const { body, headers } = await api.get(`/${path}`, query);

    Object.keys(headers).forEach(key => ctx.set(key, headers[key]));
    ctx.body = body;
  });

  // TODO: remove
  router.get('/api/posts', (ctx: Context) => {
    const pageSize = 30;
    const page = parseInt((ctx.query || {}).page || '1', 10);
    const start = (page - 1) * pageSize;
    const withinRange = start < posts.length;

    if (withinRange) {
      ctx.body = (posts.slice(start, start + pageSize): Array<any>);
    } else {
      ctx.body = [];
    }
  });
};