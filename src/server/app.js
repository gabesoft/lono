import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import send from 'koa-send';
import serve from 'koa-static';

const app = new Koa();
const router = new Router();
const root = 'build/public';

router.get('/users', (ctx, res) => {
  ctx.body = 'This is the user profile page';
});

router.get('/feeds', (ctx, res) => {
  ctx.body = 'This is the feeds page';
});

app.use(serve(root));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  await send(ctx, 'index.html', { root });
});

app.listen(3000, '127.0.0.1', 1024, () => console.log('Server listening on port 3000'));