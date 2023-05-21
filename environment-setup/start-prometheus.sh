#!/bin/bash


if ! docker ps --format "{{.Names}}" | grep -q "prometheus"; then

    docker run \
        -d \
        --rm \
        -it \
        --network=host \
        -p 9090:9090 \
        -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
        --name prometheus \
        prom/prometheus

fi
