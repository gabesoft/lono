import type Router from 'koa-router';

import feeds from './data-feeds';
import posts from './data-posts';

export default (router: Router) => {
  router.get('/api/users', (ctx) => {
    const auth = ctx.state.auth;
    ctx.body = { name: auth.name, email: auth.email };
  });

  router.get('/api/posts', (ctx) => {
    ctx.body = posts.slice(0,20);
  });

  router.get('/api/feeds', (ctx) => {
    ctx.body = feeds.feeds;
  });

  router.get('/api/subscriptions', (ctx) => {
    ctx.body = feeds.subscriptions;
  });
};