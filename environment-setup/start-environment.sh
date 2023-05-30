#!/bin/bash

source ./set-environment.sh

./start-postgres.sh
./start-jaeger.sh
./start-otel-collector.sh
./start-prometheus.sh
./start-loki.sh
./start-fluentd.sh
./start-grafana.sh

