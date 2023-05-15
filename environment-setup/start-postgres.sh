#!/bin/bash


if ! docker ps --format "{{.Names}}" | grep -q "postgres"; then

    docker run \
        -d \
        --rm \
        -it \
        -e POSTGRES_PASSWORD=$PGPASSWORD \
        --network=host \
        --name postgres \
        postgres

fi
