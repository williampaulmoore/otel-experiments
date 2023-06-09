import { env } from '../env.mjs';
import Koa from 'koa';
import router from './router';
import { notfound } from './notfound';
import { OtelTracing, OtelMetrics, FluentdLogging } from 'observability-otel-fluentd';

const app = new Koa();

app.use(OtelTracing);
app.use(OtelMetrics);
app.use(FluentdLogging);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notfound);

app.listen(env.LISTEN_ON_PORT, env.LISTEN_ON_ADDRESS,  () => {
    console.log(`Server running on http:://${env.LISTEN_ON_ADDRESS}:${env.LISTEN_ON_PORT}`);
});
