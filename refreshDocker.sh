#!/usr/bin/env bash
docker-compose rm -f
docker login -u amplify -p amplify-pass cgbudockerdev1.us.oracle.com:7755
docker-compose pull
docker logout cgbudockerdev1.us.oracle.com:7755
