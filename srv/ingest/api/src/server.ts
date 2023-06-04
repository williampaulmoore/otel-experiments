import { env } from '../env.mjs';
import Koa from 'koa';
import { OtelTracing, OtelMetrics } from './otel.js';
import { FluentdLogging } from './fluentd';
import router from './router';
import { notfound } from './notfound';
import {libName } from 'observability-otel-fluentd';

const app = new Koa();

app.use(OtelTracing);
app.use(OtelMetrics);
app.use(FluentdLogging);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notfound);

app.listen(env.LISTEN_ON_PORT, env.LISTEN_ON_ADDRESS,  () => {
    console.log(libName());
    console.log(`Server running on http:://${env.LISTEN_ON_ADDRESS}:${env.LISTEN_ON_PORT}`);
});
