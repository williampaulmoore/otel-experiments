#!/bin/bash

echo "Teardown environment"

services=(
    "grafana"
    "prometheus"
    "postgres"
    "jaeger"
    "otel-collector"
    "fluentd"
    "loki"
)

for s in ${services[@]}; do

    if docker ps --format "{{.Names}}" | grep -q "$s"; then
        docker stop "$s"
    fi

done

