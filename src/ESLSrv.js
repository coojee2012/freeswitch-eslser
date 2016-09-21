/**
 * Created by linyong on 9/2/16.
 */
import winston from 'winston';
import esl from  'modesl';
import redis from 'redis';
import Mongoose from 'mongoose';
import  DBModules from './models';
import GetConfig from './configs';

import ESLRoute from './route';


class ESLServer {
  constructor() {
    this.server = null;
    this.fsc = null;
    this.dbConnection = null;
    this.dbModels = null;
    this.config = null;
    this.redisClient = null;
    this.redisPub = null;
    this.redisSub = null;
    this.logger = null;

    this.connMongoDB = this.connMongoDB.bind(this);
    this.startServer = this.startServer.bind(this);
    this.run = this.run.bind(this);
  }

  connRedisDB() {
    const _this = this;
    const inital = (tag, options) => {
      return new Promise((resolve, reject) => {
        const client = redis.createClient(options);
        /**
         * error handler for errors after initial connection has been established
         * @param {Error} err is the error thrown
         * @return {null}
         */
        const defaultErrorHandler = (err) => {
          _this.logger.error(['ESL', 'Redis', tag], err.message);
        };

        const initialErrorHandler = (err) => {
          _this.logger.error(['ESL', 'Redis', tag], err.message);
          reject(err);
          client.end();
        };

        client.on('error', initialErrorHandler);

        client.on("ready", () => {
          _this.logger.info(['ESL', 'Redis', tag], `redisClient ${tag} connection created`);
          // change the error handler to simply log errors
          client.removeListener('error', initialErrorHandler);
          client.on('error', defaultErrorHandler);
          resolve(client);
        });

      });
    }
    return new Promise((resolve, reject) => {
      const options = _this.config.redis;
      Promise.all([inital('client',options), inital('pub',options), inital('sub',options)]).then(data => {
        _this.redisClient = data[0];
        _this.redisPub = data[1];
        _this.redisSub = data[2];
        resolve();
      }).catch(err => {
        reject(err);
      });
    })
  }

  RedisPromise(command, ...args) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.redisClient[command](...args, (err, res)=> {
        err ? reject(err) : resolve(res);
      })
    });
  }

  connMongoDB() {
    const _this = this;
    const {uris, opts} = _this.config.mongos;
    const dbConnection = _this.dbConnection = Mongoose.createConnection(uris, opts);
    const mongoModels = _this.dbModels = {};

    return new Promise((resolve, reject)=> {
      dbConnection.on('error', (error) => {
        _this.logger.error(['ESL','mongo-models'], error);
        reject(error);
      });
      dbConnection.once('open', () => {
        _this.logger.info(['ESL','mongo-models'], "DB Connected!");
        Object.keys(DBModules).map(key => {
          mongoModels[key] = dbConnection.model(key, DBModules[key]);
        });
        resolve();
      });
      dbConnection.on("reconnected", () => {
        _this.logger.warn(['ESL','mongo-models'], "DB Reconnected!");
      });

      dbConnection.on("disconnected", () => {
        _this.logger.warn(['ESL','mongo-models'], 'DB Disconnected!');
      });

      dbConnection.on("close", () => {
        _this.logger.info(['ESL','mongo-models'], 'DB Closed!');
      });
    })

  }

  /**
   * 启动esl server
   * @returns {Promise}
   */
  startServer() {
    const _this = this;
    return new Promise((resolve, reject) => {
      const Server = _this.server = new esl.Server(
          {
            port: _this.config.ccPort,
            myevents: ''//首次执行的事件名
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              _this.logger.info("esl Server is up");
              resolve();
            }
          });
      Server.on('connection::open', (conn, id) => {
        _this.logger.info(`connection is opened:${id}`);
      })
      Server.on('connection::close', (conn, id) => {
        _this.logger.info(`connection is closed:${id}`);
      })
      Server.on('connection::ready', (conn, id) => {
        _this.logger.info('new call ' + id);
        //_this.logger.info('new conn',conn);


        const call_start = new Date().getTime();
        const eslRouter = new ESLRoute({
          logger:_this.logger,
          DBModels: _this.dbModels,
          conn,
          callId: id
        });

        const {fsHost, fsHostName, fsName} = eslRouter.getFSInfo() || {};
        _this.logger.info('ddd', {fsHost, fsHostName, fsName});
        // TODO 根据fsHost和fsName新建fsClient 需要socket的负载均衡


        const WriteCDR = () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        }
        // 根据获取线路或主叫的目的号码destinationNumber,决定下一步操作
        const GetRouter = (destinationNumber) => {
          return new Promise((resolve, reject) => {
            resolve({next: 'ivr', number: 200});// 拨打ivr
          })
        }

        const DialIvr = (ivrnumber) => {
          return new Promise((resolve, reject) => {
            eslRouter.answer()
                .then(()=> {
                  return eslRouter.play_and_get_digits({});
                })
          });
        }

        WriteCDR()
            .then(()=> {
              return GetRouter();
            })
            .then(()=> {
              return DialIvr(200)
            })
            .catch(err=> {
              _this.logger.info('eeee', err);
            })

        /*        conn.execute('echo', (evt) => {
         _this.logger.info('echoing', Object.keys(evt));
         });*/

        conn.on('esl::end', (evt, body) => {
          const call_end = new Date().getTime();
          const delta = (call_end - call_start) / 1000;
          _this.logger.info("Call duration " + delta + " seconds");
        });
      });

    });
  }


  run() {
    const _this = this;
    GetConfig().then(conf=> {
          _this.config = conf;
          _this.logger = new (winston.Logger)({
            levels: conf.logLevel.levels,
            transports: [
              //new FluentTransport(`${tag_prefix}.${topic}`, config),
              new (winston.transports.Console)()
            ]
          });
          return _this.connRedisDB();
        })
        .then(()=> {
          return _this.connMongoDB();
        })
        .then(()=> {
          return _this.startServer();
        })
        .then(()=> {

        })
        .catch(err=> {
          _this.logger.info(`start server error:${err}`);
        })
  }
}
export default ESLServer;




