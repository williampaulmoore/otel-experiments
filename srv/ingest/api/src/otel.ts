import { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { trace } from '@opentelemetry/api';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Context, Next } from 'koa';


const resouce = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'ingrest-api',
});


// Tracing
const traceProvider = new BasicTracerProvider({
    resource: resouce,
});

const traceExporter = new OTLPTraceExporter({
});

traceProvider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
traceProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
traceProvider.register();

export const OtelTracing = async (ctx: Context, next: Next) => {
    // t(wpm). Can we add the tracer to the context?
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan(ctx.path);
    await next();
    span.end();
}



// Metrics
const meterProvider = new MeterProvider({
    resource: resouce
});

const metricsExporter = new OTLPMetricExporter();

meterProvider.addMetricReader(new PeriodicExportingMetricReader({
    exporter: metricsExporter,
    exportIntervalMillis: 1000,
}));


const meter = meterProvider.getMeter('default');
const counters = new Map();

export const OtelMetrics = async (ctx: Context, next: Next) => {
    const requestCountName = `request_count.${ctx.path}.${ctx.method}`;
    const requestDurationName = `request_duration_ms.${ctx.path}.${ctx.method}`;
    const requestServerErrorCountName = `request_server_error_count.${ctx.path}.${ctx.method}`;

    let requestCount = counters.get(requestCountName);
    if(!requestCount) {
        requestCount = meter.createCounter(requestCountName, {
            description: `Total number of requests for ${ctx.path} (${ctx.method})`
        });
        counters.set(requestCountName,requestCount);
    }

    requestCount.add(1);

    let duration_in_ms = 0;
    try
    {
        const start = process.hrtime();
        await next();
        const end = process.hrtime(start);
        duration_in_ms = end[0] * 1e9 + end[1] / 1e6;
    }
    catch(e)
    {
        let serverErrorCount = counters.get(requestServerErrorCountName);
        if(!serverErrorCount) {
            serverErrorCount = meter.createCounter(requestServerErrorCountName, {
                description: `Total number of server errors for ${ctx.path} (${ctx.method})`,
            });
        }
        serverErrorCount.add(1);
        throw e;
    }

    const histogram = meter.createHistogram(requestDurationName, {
        description: `Request duration in milliseconds for ${ctx.path} (${ctx.method})`,
    });
    histogram.record(duration_in_ms);


    if(ctx.status / 100 == 5) {
        let serverErrorCount = counters.get(requestServerErrorCountName);
        if(!serverErrorCount) {
            serverErrorCount = meter.createCounter(requestServerErrorCountName, {
                description: `Total number of server errors for ${ctx.path} (${ctx.method})`,
            });
        }
        serverErrorCount.add(1);
    }
}

