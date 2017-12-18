// @flow

import Koa from 'koa';

const app = new Koa();

// flow sample TODO: remove
type Point2d = {
  x: number,
  y: number
};

const pt: Point2d = {
  x: 1,
  y: 2
};


const x: number = 45;

console.log(pt, x);
// end flow sample

app.use(async ctx => {
  ctx.body = 'Hello World from KOA';
});

app.listen(3000, '127.0.0.1', 1024, () => console.log('Server listening on port 3000'));