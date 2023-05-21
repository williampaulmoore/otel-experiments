import { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace } from '@opentelemetry/api';
import { Context, Next } from 'koa';

const traceProvider = new BasicTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'ingrest-api',
    }),
});

traceProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
traceProvider.register();


export const OtelTracing = async (ctx: Context, next: Next) => {
    // t(wpm). Can we add the tracer to the context?
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan(ctx.path);
    await next();
    span.end();
}
