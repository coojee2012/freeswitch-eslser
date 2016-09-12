/**
 * Created by linyong on 9/2/16.
 */

import esl from  'modesl';
import Mongoose from 'mongoose';
import  DBModules from './models';
import conf from './configs';

import ESLRoute from './route';

class ESLServer {
  constructor() {
    this.server = null;
    this.dbConnection = null;
    this.dbModels = null;
    this.config = conf;


    this.connMongoDB = this.connMongoDB.bind(this);
    this.startServer = this.startServer.bind(this);
    this.run = this.run.bind(this);
  }

  connMongoDB() {
    const _this = this;
    const {uris, opts} = _this.config.mongos;
    const dbConnection = _this.dbConnection = Mongoose.createConnection(uris, opts);
    const mongoModels = _this.dbModels = {};

    return new Promise((resolve, reject)=> {
      dbConnection.on('error', (error) => {
        console.log(['mongo-models', 'error'], error);
        reject(error);
      });
      dbConnection.once('open', () => {
        console.log(['mongo-models', 'info'], "DB Connected!");
        Object.keys(DBModules).map(key => {
          mongoModels[key] = dbConnection.model(key, DBModules[key]);
        });
        resolve();
      });
      dbConnection.on("reconnected", () => {
        console.log(['mongo-models', 'warn'], "DB Reconnected!");
      });

      dbConnection.on("disconnected", () => {
        console.log(['mongo-models', 'warn'], 'DB Disconnected!');
      });

      dbConnection.on("close", () => {
        console.log(['mongo-models', 'warn'], 'DB Closed!');
      });
    })

  }

  startServer() {
    const _this = this;
    return new Promise((resolve, reject) => {
      const Server = _this.server = new esl.Server(
          {
            port: 8085,
            myevents: ''//首次执行的事件名
          }, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("esl Server is up");
              resolve();
            }
          });
      Server.on('connection::open', (conn, id) => {
        console.log(`connection is opened:${id}`);
      })
      Server.on('connection::close', (conn, id) => {
        console.log(`connection is closed:${id}`);
      })
      Server.on('connection::ready', (conn, id) => {
        console.log('new call ' + id);
        const call_start = new Date().getTime();
        const eslRouter = new ESLRoute({
          DBModels: _this.dbModels,
          conn,
          callId: id
        });


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
              console.log('eeee', err);
            })

        /*        conn.execute('echo', (evt) => {
         console.log('echoing', Object.keys(evt));
         });*/

        conn.on('esl::end', (evt, body) => {
          const call_end = new Date().getTime();
          const delta = (call_end - call_start) / 1000;
          console.log("Call duration " + delta + " seconds");
        });
      });

    });
  }


  run() {
    const _this = this;
    _this.connMongoDB()
        .then(()=> {
          return _this.startServer();
        })
        .then(()=> {

        })
        .catch(err=> {
          console.log(`start server error:${err}`);
        })
  }
}
export default ESLServer;




