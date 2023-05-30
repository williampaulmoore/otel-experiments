#!/bin/bash

service='loki'

if ! docker ps --format '{{.Names}}' | grep -q $service; then

    docker run \
        -d \
        --rm \
        -it \
        --network=host \
        --name $service \
        grafana/loki:latest 

    # -p 3100:3100

fi
