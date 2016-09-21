/**
 * Created by linyong on 16/5/31.
 */
export default {
  // call control server listening IP
  ccHost: "0.0.0.0",
  // call control server listening port
  ccPort: 8085,
  // api server listening IP
  apiHost: "0.0.0.0",
  // api server listening IP
  apiPort: 4009,
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
    uris: "mongodb://test:test@127.0.0.1:27017/test",
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
  // 自定义业务相关插件关于路由的配置
  apiRouteOptions: {
    config: {
      auth: false, // false ,'default','jwt','jwk' 默认为:jwk
      cache: {
        expiresIn: 60 * 60 * 1000,
        //expiresAt:'23:59',
        privacy: 'private',
        statuses: [200, 304],
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
  // good log options
  goodOptions: {
    ops: {
      interval: 30 * 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{log: ['debug', 'info', 'warn', 'error'], response: '*'}]
      }, {
        module: 'good-console'
      }, 'stdout'],
    }
  },
  logLevel: {
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warn: 4,
      notice: 5,
      info: 6,
      debug: 7,
    },
    colors: {
      debug: 'blue',
      info: 'green',
      notice: 'auqamarin',
      warn: 'yellow',
      error: 'red',
      crit: 'magenta',
      alert: 'purple',
      emerg: 'indigo',
    }
  }
};
