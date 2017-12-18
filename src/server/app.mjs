import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World from KOA';
});

app.listen(3000, () => console.log('Server listening on port 3000'));