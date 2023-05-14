# Environment Setup

Contains the scripts needs to set up the environment dependencies the services has which are:

- otel-collector  ,accepts open telementry signals
- jaeger          ,distributed tracing


## Getting started


- deploy the tracing services

```sh 
./start-environment.sh
```

- test

```sh
$GOPATH/bin/tracegen -otlp-insecure -duration 2s
```

N. This will send tests traces to the open-telemetry collector.
N. Jaeger can be accessed on: http://localhost:16686
N. tracegen can be installed with:

```sh
go install github.com/open-telemetry/opentelemetry-collector-contrib/tracegen@latest
```

