/**
 * Created by linyong on 9/2/16.
 */

import esl from  'modesl';
import  DBModules from './models';

import CONF from './config';


class ESLServer {
  constructor(){
    this.server = null;
  }
  async run() {
    try {
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
          console.info(`${new Date()} FAQ API Server Started At: ${this.server.info.uri}`);
        }
      });
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
  
}
export default ESLServer;

const Server = new esl.Server({port: 8085, myevents: true}, function () {
  console.log("esl Server is up");
});
Server.on('connection::open',function (conn,id) {
  console.log(`connection is opened:${id}`);
})

Server.on('connection::close',function (conn,id) {
  console.log(`connection is closed:${id}`);
  })
Server.on('connection::ready', function (conn, id) {
  console.log('new call ' + id);
  conn.call_start = new Date().getTime();

  conn.execute('answer',(evt)=>{
    console.log('answered',evt);
  });
  conn.execute('echo', (evt) => {
    console.log('echoing',evt);
  });

  conn.on('esl::end', function (evt, body) {
    this.call_end = new Date().getTime();
    var delta = (this.call_end - this.call_start) / 1000;
    console.log("Call duration " + delta + " seconds");
  });
});

export default Server;
