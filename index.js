const path = require('path');
const Koa = require('koa');
const app = new Koa();
const _ = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');

app.use(_.get('/', async ctx => {
  console.log('ENDPOINT /');

  ctx.body = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Dashboard</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans"
          rel="stylesheet">
    <link rel="stylesheet" href="/static/general.css">
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="/static/dashboard.bundle.js"></script>
  </body>
</html>
`;
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
