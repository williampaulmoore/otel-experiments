#!/bin/bash

# t(wpm). change this to used an array

if docker ps --format ""{{.Names}} | grep -q "grafana"; then
    docker stop grafana
fi

if docker ps --format "{{.Names}}" | grep -q "prometheus"; then
    docker stop prometheus
fi

if docker ps --format "{{.Names}}" | grep -q "postgres"; then
    docker stop postgres
fi

if docker ps --format "{{.Names}}" | grep -q "jaeger"; then
    docker stop jaeger
fi

if docker ps --format "{{.Names}}" | grep -q "otel-collector"; then
    docker stop otel-collector
fi

if docker ps --format "{{.Names}}" | grep -q "fluentd"; then
    docker stop fluentd
fi

if docker ps --format "{{.Names}}" | grep -q "loki"; then
    docker stop loki
fi
