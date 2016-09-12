const prodConf = {
  // api server listening IP
  host: "0.0.0.0",
  // api server listening port
  port: "80",
  // good log options
  goodOptions: {
    ops: {
      interval: 30 * 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: ['warn', 'error'], response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout'],
    }
  },
  // debug
  debug: {
    isDebug: false,
    tenantId: 'math.yunkefu.com',
  },
  channelConfig: {
    baseUrl : "http://internal-prod-services-1765792005.cn-north-1.elb.amazonaws.com.cn:10030",
    apiVersion:"/api/v0"
  },
  //druid
  druidOptons:{
    host:'druid-broker',
    port:8082,
    verbose: false,
    timeout: 30 * 1000,
    timezone:'Asia/Hong_Kong',
    output: 'json',
  },
  // 自定义业务相关插件关于路由的配置
  routeOptions: {
    config: {
      auth: 'jwk', // false ,'default','jwt','jwk' 默认为:jwk
      cache: {
        expiresIn: 60 * 60 * 1000,
        //expiresAt:'23:59',
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
export  default prodConf;
