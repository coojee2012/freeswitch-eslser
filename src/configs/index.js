/**
 * Created by linyong on 9/8/16.
 */
import  devConf from './app_development';
import  nightlyConf from './app_nightly';
import  stageConf from './app_stage';
import  prodConf from './app_production';
import  {exec} from 'child_process';


const GetConfig = () => {
  return new Promise((resolve, reject) => {
    exec('echo $CONF_ENV', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log(`stdout: ${stdout}`);
        const CONF_ENV = stdout.replace(/\r|\n/,'') || process.env.CONF_ENV || 'development';
        console.log('Run CONF_ENV:', CONF_ENV);
        let CONF = null;
        switch (CONF_ENV) {
          case 'development':
            CONF = devConf;
            break;
          case 'nightly':
            CONF = nightlyConf;
            break;
          case 'stage':
            CONF = stageConf;
            break;
          case 'production':
            CONF = prodConf;
            break;
          default:
            CONF = devConf;
            break;
        }
        resolve(CONF);
      }
    });
  })
}


export default GetConfig;
