#!/bin/bash

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
