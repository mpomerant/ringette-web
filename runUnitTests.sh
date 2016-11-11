#!/usr/bin/env bash
docker rm -f  ringette-web-unit
docker run --rm --name ringette-web-unit -v $PWD/test:/usr/src/app/test -v $PWD/web:/usr/src/app/web -v $PWD/reports:/usr/src/app/reports -i cgbudockerdev1.us.oracle.com:7755/amplify/ui-component/ringette-web/test
