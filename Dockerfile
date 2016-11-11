FROM cgbudockerdev1.us.oracle.com:7755/amplify/ui-component/test
COPY web /usr/src/app/web
COPY src /usr/src/app/src
COPY test /usr/src/app/test
COPY template /usr/src/app/template
COPY package.json /usr/src/app/package.json
COPY karma.conf.js /usr/src/app/karma.conf.js
COPY test-main.js /usr/src/app/test-main.js
COPY gulpfile.js /usr/src/app/gulpfile.js
