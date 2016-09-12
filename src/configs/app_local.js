module.exports = {
  // api server listening IP
  host: "0.0.0.0",
  // api server listening port
  port: "4008",
  // good log options
  goodOptions: {
    includes: {
      request: ['headers', 'payload'],
      response: ['payload'],
    },
    ops: {
      interval: 30 * 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: ['debug', 'info', 'warn', 'error'], response: '*', ops: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout'],
      /*      file: [{
       module: 'good-squeeze',
       name: 'Squeeze',
       args: [{ ops: '*' }]
       }, {
       module: 'good-squeeze',
       name: 'SafeJson'
       }, {
       module: 'good-file',
       args: ['./awesome_log']
       }]*/
    }
  },
  // debug
  debug: {
    isDebug: true,
    tenantId: 'math.quickdesk.cn',
  },
  channelConfig: {
    baseUrl : "http://127.0.0.1:3000",
    apiVersion:"/api/v0"
  },
  //druid
  druidOptons: {
    host: 'localhost',
    port: 8082,
    verbose: false,
    timeout: 30 * 1000,
    timezone: 'Asia/Hong_Kong',
    output: 'json',
  },
  // 自定义业务相关插件关于路由的配置
  routeOptions: {
    config: {
      auth: false, // false ,'default','jwt','jwk' 默认为:jwk
      cache: {
        expiresIn: 60 * 60 * 1000,
        //expiresAt: '23:59',
        privacy: 'private',
        statuses: [200,304],
      },
      cors: {
        origin: ['*'],
      },
      state: {
        parse: false, // parse and store in request.state
        failAction: 'ignore' // may also be 'ignore' or 'log'
      },
    }
  },
  // redis config
  redisOptions: {
    host: '127.0.0.1',
    port: 6379,
    //password: '',
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
  elasticsearch:{
    host:'localhost:9200',
    log:'trace'
  }
};
export  default Config;
