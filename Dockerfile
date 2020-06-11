FROM node:10-alpine

ADD . /src

ENTRYPOINT /bin/sh

WORKDIR /src

RUN apk update && \
  apk --no-cache add libbz2 && \
  apk --no-cache add --virtual build-deps \
    bzip2-dev zlib-dev g++ gcc libgcc libstdc++ linux-headers make python xz-dev && \
  npm install && \
  npm install storm-replay && \
  npm install -g node-gyp@6.1.0 && \
  apk del build-deps

RUN npm test