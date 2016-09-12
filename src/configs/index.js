/**
 * Created by linyong on 9/8/16.
 */
import  devConf from './app_development';
import  nightlyConf from './app_nightly';
import  stageConf from './app_stage';
import  prodConf from './app_production';
const NODE_ENV = process.env.NODE_ENV || 'development';

let conf = null;
switch (NODE_ENV) {
  case 'development':
    conf = devConf;
    break;
  case 'nightly':
    conf = nightlyConf;
    break;
  case 'stage':
    conf = stageConf;
    break;
  case 'production':
    conf = prodConf;
    break;
  default:
    conf = devConf;
    break;
}
export default conf;
