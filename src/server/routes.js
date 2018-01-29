import type Router from 'koa-router';

import feeds from './data-feeds';
import posts from './data-posts';

export default (router: Router) => {
  router.get('/api/user', (ctx) => {
    const auth = ctx.state.auth;
    ctx.body = { name: auth.name, email: auth.email };
  });

  router.get('/api/posts', (ctx) => {
    const pageSize = 30;
    const page = (ctx.query || {}).page || 1;
    const start = (page - 1) * pageSize;
    const withinRange = start < posts.length;
    ctx.body = withinRange
             ? posts.slice(start, start + pageSize)
             : [];
  });

  router.get('/api/feeds', (ctx) => {
    ctx.body = feeds.feeds;
  });

  router.get('/api/subscriptions', (ctx) => {
    ctx.body = feeds.subscriptions;
  });
};