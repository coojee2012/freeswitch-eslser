/**
 * Created by linyong on 16/5/31.
 */
module.exports = {
  // api server listening IP
  host: "0.0.0.0",
  // api server listening port
  port: "4008",
  // debug
  debug: {
    isDebug: true,
    tenantId: 'math.yunkefu.dev',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    //password: '',
    "opts": {
      "parser": "javascript"
    },
  },
  mongos: {
    //uris: "mongodb://test:test@192.168.2.220:28017,192.168.2.220:28018,192.168.2.220:28019/test",
    uris:"mongodb://test:test@127.0.0.1:27017/test",
    /**
     * db      - passed to the connection db instance
     * server  - passed to the connection server instance(s)
     * replset - passed to the connection ReplSetServer instance
     * user    - username for authentication
     * pass    - password for authentication
     *
     * auth    - options for authentication (see http://mongodb.github.com/node-mongodb-native/api-generated/db.html#authenticate)
     * mongos  - Boolean - if true, enables High Availability support for mongos
     */
    opts: {}
  },
};
