/**
 * Created by linyong on 9/21/16.
 */
import Hapi from 'hapi';
import Good from 'good';
import Inert from 'inert';
import catbox from 'catbox-redis';
import hapiRedis from 'hapi-redis';
import ToolsPlugin from 'hapi-plugin-tools';
import MongoModels from 'hapi-plugin-mongoose';

import DBModules from './models';
import GetConfig from './configs';

class APIServer {
  constructor() {
    this.isRun = false;
    this.conf = null;
    this.port = null;
    this.host = null;
    this.server = null;
  }

  init() {
    const self = this;
    return new Promise((resolve, reject) => {
      GetConfig()
          .then(conf => {
            self.conf = conf;
            self.port = conf.apiPort;
            self.host = conf.apiHost;
            self.server = new Hapi.Server({
              app: {
                config: conf,
              },
              cache: [{
                engine: catbox,
                name: 'hapi-redis-cache',
                host: conf.redis.host,
                port: conf.redis.port,
                partition: 'reporter-api',
              }],
              load: {
                sampleInterval: 0,
              },
              connections: {
                compression: true,//if false, response content encoding is disabled. Defaults to true.
                router: {
                  isCaseSensitive: true,//URL区分大小写
                  stripTrailingSlash: false,//消除URL尾部的/
                },
                routes: {},
              },
            });
            resolve();
          })
          .catch(err => {
            console.log('Get config err:', err);
            reject(err);
          })
    });
  }

  connection() {
    const self = this;
    return new Promise((resolve) => {
      resolve(self.server.connection({
        host: self.host,
        port: self.port,
        labels: ['main'],
      }));
    });
  }


  /**
   * 加载权限认证插件
   * @param type  指定默认的权限模块
   */
  loadAuth(type = 'jwk') {
    const self = this;
    /* self.server.register([{
     register: JWT,
     }, {
     register: AuthJWK,
     }], (err) => {
     if (err) {
     throw err;
     }
     self.server.auth.strategy('jwt', 'jwt',
     {
     key: (decoded, callback) => {
     callback(null, 'NeverShareYourSecret');
     },
     validateFunc: (decoded, request, callback) => {
     if (!decoded.id) {
     return callback(null, false);
     }
     else {
     return callback(null, true);
     }
     },
     verifyOptions: {
     ignoreExpiration: false,
     algorithms: ['HS256'],
     },
     complete: true,
     });
     self.server.auth.strategy('jwk', 'jwk', {});
     self.server.auth.default(type);
     });*/
  }

  /**
   * 在server上加载一些常用的方法
   */
  addMethods() {
    const self = this;
    // 在method上附加执行sql命令的方法
    /* self.server.method([
     {
     name: 'GetQueryTime',
     method: GetQueryTime,
     options: {
     cache: {
     cache: 'hapi-redis-cache',
     expiresIn: 30 * 1000,
     generateTimeout: 100
     }
     }
     },
     {
     name: 'routeCache',
     method: (segment, handler) => {
     return self.server.cache({
     cache: 'hapi-redis-cache',
     expiresIn: 10 * 1000,
     staleIn: 5 * 1000,
     staleTimeout: 1000,//如果一个项目是过时的，重新检查前要等待的毫秒数
     generateTimeout: 30 * 1000,
     segment: segment,
     generateFunc: function ({request}, next) {
     handler(self.server, request, next);
     },
     });
     },
     options: {}
     }, {
     name: 'routeHandle',
     method: (cache, request, reply) => {
     const restJson = self.server.plugins['tools-hapi'].restJson;
     const id = (request.credentials.aud + JSON.stringify(request.payload)).trim();
     const ttlStart = request.ttlStart || new Date().getTime();
     cache.get({id, request}, (err, result) => {
     if (err) {
     reply(restJson(result, err, ttlStart)).type('application/json');
     } else {
     reply(restJson(result, 0, ttlStart)).type('application/json');
     }
     });
     },
     options: {}
     }
     ]);*/
  }

  addExts() {
    const self = this;
    self.server.ext([{
      type: 'onRequest',
      method(request, reply) {
        if (!self.conf.apiRouteOptions.config.auth && !request.credentials) {
          request.credentials = {
            aud: `tenant://${self.conf.debug.tenantId}`,
          };
        }
        request.ttlStart = new Date().getTime();
        request.once('finish', () => {
        });
        return reply.continue();
      },
    }, {
      type: 'onPostHandler',
      method(request, reply) {
        const response = request.response;
        if (response.isBoom &&
            response.output.statusCode === 404) {
          return reply.file('404.html').code(404);
        }
        return reply.continue();
      },
    }]);
  }

  /**
   * 加载一系列的功能插件
   */
  loadLib() {
    const self = this;

    return new Promise((resolve, reject) => {
      self.server.register([
        {
          register: Inert,
        },
        {
          register: Good,
          options: self.conf.goodOptions,
        },
        {
          register: hapiRedis,
          options: {
            connection: self.conf.redis,
          },
        },
        {
          register: ToolsPlugin,
          options: {},
        },
        {
          register: MongoModels,
          options: Object.assign({}, self.conf.mongos, {models: DBModules}),
        }
      ], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * 加载静态资源业务插件
   */
  loadStatics() {
    return Promise.resolve();
  }

  /**
   * 加载一些业务插件
   * @returns {Promise}
   */
  loadApi() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.server.register([
       /* {
         // register: FAQRegister,
         // options: self.conf.routeOptions,
        }*/], {
        once: false,
        routes: {
          prefix: '/api/',
        },
        select: ['main'],
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  async run() {
    try {
      await this.init();
      await this.connection();
      await this.addMethods();
      await this.addExts();
      await this.loadLib();
      await this.loadAuth();
      await this.loadStatics();
      await this.loadApi();
      this.server.start(err => {
        if (err) {
          throw err;
        } else {
          this.isRun = true;
          console.info(`${new Date()} Call Control API Server Started At: ${this.server.info.uri}`);
        }
      });
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
export default APIServer;