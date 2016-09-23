/* @flow */
/**
 * Created by linyong on 9/23/16.
 */
interface IPBX {
  playback(filePath:string):Promise;
  answer():Promise;
  hangup(reason?:string):Promise;
}

export {IPBX}