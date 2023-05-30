#!/bin/bash

service='fluentd'

if ! docker ps --format '{{.Names}}' | grep -q $service; then

    docker run \
        -d \
        -it \
        --rm \
        -v $(pwd)/fluentd-config.conf:/fluentd/etc/fluent.conf \
        --network=host \
        --name $service \
        grafana/fluent-plugin-loki:master

        # -p 24224:24224 \
        # -p 24224:24224/udp \
fi
