import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
    ctx.body = "Hello world";
});

app.listen(8080, () => {
    console.log('Server running on http:://localhost:8080');
});
