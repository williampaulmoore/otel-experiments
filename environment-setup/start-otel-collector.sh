#!/bin/bash


if ! docker ps --format "{{.Names}}" | grep -q "otel-collector"; then

    docker run \
        -d \
        --rm \
        -it \
        --network=host \
        -v $(pwd)/otel-collector-config.yml:/etc/otel-collector-config.yml \
        --name otel-collector \
        otel/opentelemetry-collector-contrib \
        --config=/etc/otel-collector-config.yml

fi
