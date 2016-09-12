/**
 * Created by linyong on 9/12/16.
 */
class ESLRoute {
  constructor({DBModels, conn, callId}) {
    this.DBModels = DBModels;
    this.conn = conn;
    this.callId = callId;


    this.uuid = null;
    this.init();
  }

  init() {
    const {headers:chanData, hPtr, type:chanType, subclass:chanSub, body:chanBody} =this.conn.getInfo();
    const ChannelData = {};
    chanData.map((item, index) => {
      ChannelData[item.name] = item.value;
    });
    const direction = ChannelData['Channel-Direction'];
    const destinationNumber = ChannelData['Channel-Destination-Number'];
    const ani = ChannelData['Channel-ANI'];
    this.uuid = ChannelData['Channel-Unique-ID'];
  }

  getHeader(headers, header) {
    let result = '';
    for (let i = 0; i < headers.length; i++) {
      const item = headers[i];
      if (item.name === header) {
        result = item.value;
        break;
      }
    }
    return result;
  }

  strArgs(args) {
    const resStr = [];
    Object.keys(args).map((k, index) => {
      resStr.push(args[k]);
    })
    return resStr.join(' ');
  }

  /**
   * https://wiki.freeswitch.org/wiki/Misc._Dialplan_Tools_answer
   */
  answer() {
    const _this = this;
    return new Promise((resolve, reject) => {
        _this.conn.execute('answer', _this.uuid, (evt)=> {
          console.log('Answer -> ',evt);
          resolve(evt);
        })
    });
  }

  /**
   * https://wiki.freeswitch.org/wiki/Misc._Dialplan_Tools_playback
   * @param file
   * @param terminators
   * @returns {Promise}
   */
  playback(file, terminators = 'none') {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.conn.execute('set', `playback_terminators=${terminators}`, _this.uuid, evt => {
        _this.conn.execute('playback', file, _this.uuid, (evt)=> {
          resolve(evt);
        })
      });
    });
  }

  /**
   * https://wiki.freeswitch.org/wiki/Misc._Dialplan_Tools_play_and_get_digits
   * @param opts
   * @returns {Promise}
   */
  play_and_get_digits(opts) {
    const _this = this;
    const {min, max, tries, timeout, terminators, file, invalid_file, var_name, regexp, digit_timeout, transfer_on_failure} =opts
    const args = {
      min: 1,//最小
      max: 1,
      tries: 3,
      timeout: 3 * 1000,
      terminators: '#',
      file: '/Users/linyong/Downloads/test11.wav',
      invalid_file: 'invalid.wav',
      var_name: 'ivr_input_digit',
      regexp: '\\d',
      digit_timeout: 3 * 1000,
      transfer_on_failure: 300
    }
    return new Promise((resolve, reject) => {
      _this.conn.execute('play_and_get_digits', _this.strArgs(args), _this.uuid, (evt)=> {
        console.log('dddd',evt);
        console.log('get_digits:', _this.getHeader(evt.headers, 'variable_' + 'ivr_input_digit'));
        resolve();
      });
    });
  }
}
export default ESLRoute;
