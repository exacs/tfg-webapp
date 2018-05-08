const path = require('path');
const Koa = require('koa');
const app = new Koa();
const _ = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');

app.use(_.get('/', async ctx => {
  console.log('ENDPOINT /');
}));

app.use(_.get('/query', async ctx => {
  console.log('ENDPOINT /query');
}));

app.use(mount('/static', serve(path.join(__dirname, 'static'))));

if (process.env.NODE_ENV === 'development') {
  const middleware = require('koa-webpack');
  const config = require('./webpack.dev.js');
  app.use(middleware({
    config: config
  }));
}


app.listen(3000);
