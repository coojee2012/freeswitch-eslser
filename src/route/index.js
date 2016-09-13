/**
 * Created by linyong on 9/12/16.
 */
class ESLRoute {
  constructor({DBModels, conn, callId}) {
    this.DBModels = DBModels;
    this.conn = conn;
    this.callId = callId;

    this.fsInfo = null;
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

    const fsHost = ChannelData['FreeSWITCH-IPv4'];
    const fsHostName = ChannelData['FreeSWITCH-Hostname'];
    const fsName = ChannelData['FreeSWITCH-Switchname'];


    this.fsInfo = {fsHost, fsHostName, fsName};
    this.uuid = ChannelData['Channel-Unique-ID'];
  }

  getFSInfo() {
    return this.fsInfo;
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
        //  console.log('Answer -> ',evt);
        resolve(evt);
      })
    });
  }

  /**
   * https://wiki.freeswitch.org/wiki/Misc._Dialplan_Tools_hangup
   */
  hangup(reason = '') {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.conn.execute('hangup', reason, _this.uuid, (evt)=> {
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
    const {min, max, tries, timeout, terminators, file, invalid_file, var_name, regexp, digit_timeout, transfer_on_failure} =opts;
    const args = {
      min: 1,//最小
      max: 4,
      tries: 3,
      timeout: 3 * 1000,
      terminators: '#',
      file: '/Users/linyong/Downloads/test1.wav',
      invalid_file: 'invalid.wav',
      var_name: 'ivr_input_digit',
      regexp: '\\d+',
      digit_timeout: 3 * 1000,
      transfer_on_failure: 300
    }
    return new Promise((resolve, reject) => {
      _this.conn.execute('play_and_get_digits', _this.strArgs(args), _this.uuid, (evt)=> {
        const input = _this.getHeader(evt.headers, 'variable_' + 'ivr_input_digit');
        console.log('get_digits:', input);
        if (String(input) === '1') {
          _this.uuid_record().then(()=> {
          });
          return _this.callCenter();
        }
        else if (String(input).length === 4) {
          return _this.uuid_transfer(input);
        }
        else {
          return _this.hangup();
        }
      });
    });
  }

  /**
   *
   * @returns {Promise}
   */
  callCenter() {
    const _this = this;
    return new Promise((resolve, reject) => {
      // support@default
      _this.conn.execute('callcenter', 'support@default', _this.uuid, (evt)=> {
        //console.log('callcenter:', evt);
        resolve();
      });
    });
  }

  uuid_record(opt = 'start') {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.conn.api('uuid_record', [_this.uuid, opt, `/tmp/${_this.uuid}.wav`], (evt)=> {
        console.log('uuid_record:', evt);
        resolve(evt);
      });
    })
  }

  /**
   * Transfers an existing call to a specific extension within a <dialplan> and <context>. Dialplan may be "xml" or "directory".
   * Usage: uuid_transfer <uuid> [-bleg|-both] <dest-exten> [<dialplan>] [<context>]
   * @param exten
   * @returns {Promise}
   */
  uuid_transfer(exten) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.conn.api('uuid_transfer', [_this.uuid, '-both', `${exten}`,'xml','default'], (evt)=> {
        console.log('uuid_transfer:', evt);
        resolve(evt);
      });
    })
  }
}
export default ESLRoute;
