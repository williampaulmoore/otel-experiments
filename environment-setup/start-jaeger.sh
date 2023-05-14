#!/bin/bash


if ! docker ps --format "{{.Names}}" | grep -q "jaeger"; then

    docker run \
        -d \
        --rm \
        -it \
        --network=host \
        --name jaeger \
        jaegertracing/all-in-one:latest

fi
