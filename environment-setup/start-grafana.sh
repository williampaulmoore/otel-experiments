#!/bin/bash

service='grafana'

if ! docker ps --format '{{.Names}}' | grep -q $service; then

    docker run \
        -d \
        -it \
        --rm \
        --network=host \
        --name $service \
        grafana/grafana:latest

        # -p 3000:3000 
fi
