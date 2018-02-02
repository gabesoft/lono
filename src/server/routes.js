import feeds from './data-feeds';
import posts from './data-posts';

import type Router from 'koa-router';
import type { Context } from 'koa';

export default (router: Router) => {
  router.get('/api/user', (ctx: Context) => {
    const auth = ctx.state.auth;
    ctx.body = { name: auth.name, email: auth.email };
  });

  router.get('/api/posts', (ctx: Context) => {
    const pageSize = 30;
    const page = parseInt((ctx.query || {}).page || '1', 10);
    const start = (page - 1) * pageSize;
    const withinRange = start < posts.length;
    ctx.body = withinRange
             ? posts.slice(start, start + pageSize)
             : [];
  });

  router.get('/api/feeds', (ctx: Context) => {
    console.log(ctx.state.user);
    ctx.body = feeds.feeds;
  });

  router.get('/api/subscriptions', (ctx: Context) => {
    ctx.body = feeds.subscriptions;
  });
};