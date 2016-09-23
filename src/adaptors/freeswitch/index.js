/* @flow */
/**
 * Created by linyong on 9/23/16.
 */
//import type {IPBX} from '../Interface';

interface IPBX {
  playback(filePath:string):Promise;
  answer():Promise;
  hangup(reason?:string):Promise;
}

//console.log('IPPNX',IPBX);
class FreePBX {
  x:string;
  y:string;


  constructor(x:string, y:string) {
    this.x = x;
    this.y = y;
  }

  playback() {
    return new Promise((resolve, reject)=> {

    })
  }

  answer() {
    return new Promise((resolve, reject)=> {

      resolve('doushi shenms' );
    })
  }

  hangup() {
    return new Promise((resolve, reject)=> {

    })
  }
}

const freePbx:FreePBX = new FreePBX('x','y');

const fn = (c:IPBX):string => {
  c.answer().then(str => {
    return str;
  });
}
fn(freePbx);
export default freePbx;