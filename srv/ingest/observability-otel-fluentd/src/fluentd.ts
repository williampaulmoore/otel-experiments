import fluentd from 'fluent-logger';
import { type Span } from '@opentelemetry/api';
import { Context, Next } from 'koa';

import { asyncLocalStorage } from './asyncStorage';

// t(wpm). change to get the service name and port from the config

const service_name = 'ingest-api';

fluentd.configure(service_name, {
    host: '0.0.0.0',
    port: 24224,
    reconnectInterval: 600000 // 10 minutes
});


export const log = (message: any) => {

    const span = asyncLocalStorage.getStore() as Span;
    const ctx = span?.spanContext();
    const traceId = ctx?.traceId ?? -1;
    const spanId = ctx?.spanId ?? -1;

    const enrichedLogEntry = {
        traceId: traceId,
        service: service_name,
        spanId: spanId,
        message: message
    };

    fluentd.emit(service_name, enrichedLogEntry );
};

export const FluentdLogging = async(ctx :Context, next: Next) => {
    log({ path: ctx.path, method: ctx.method.toUpperCase() });

    await next();
}
