const Koa = require('koa');
const app = new Koa();
const _ = require('koa-route');

app.use(_.get('/', async ctx => {
  console.log('ENDPOINT /');
}));

app.use(_.get('/query', async ctx => {
  console.log('ENDPOINT /query');
}));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
