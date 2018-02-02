/* eslint no-console: 0 */

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import serve from 'koa-static';

import auth from './middleware/auth';
import errorHandling from './middleware/errorHandling';
import responseTime from './middleware/responseTime';
import renderIndex from './middleware/renderIndex';
import setupRoutes from './routes';


const app = new Koa();
const router = new Router();
const publicDir = 'build/public';
const port = 3000;

setupRoutes(router);

app.use(errorHandling());
app.use(responseTime());
app.use(auth());
app.use(koaBody());
app.use(logger());
app.use(cors());
app.use(serve(publicDir));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(renderIndex(publicDir));

app.listen(port, '127.0.0.1', 1024, () => console.info(`Server listening on port ${port}`));