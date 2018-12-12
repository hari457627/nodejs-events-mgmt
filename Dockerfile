FROM node:6.11.0
MAINTAINER Vivek B
RUN mkdir /event
WORKDIR /event
ADD ./package.json /event/package.json
RUN npm config set registry http://registry.npmjs.org/ && npm install --no-optional --verbose
ADD . /event