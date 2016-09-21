FROM  registry.yunkefu.cc/unicall/unicall_nodev4.4.4_base:1.0.1
MAINTAINER LinYong "liny@unicall.cc"
WORKDIR /srv/app
# Bundle app source
ADD ./package.json /srv/app
RUN mkdir -p /srv/app/node_modules && npm install --production
ADD ./build /srv/app
EXPOSE 80

CMD node server.min.js
