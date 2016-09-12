/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const Extension = new Mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
  },
  accountCode: {
    type: String,
    required: true,
  },	//账号
  password: {
    type: String,
    required: true,
  },//注册密码
  deviceProto: {
    type: String,
    default: ()=>''
  },//设备协议
  deviceNumber: {
    type: String,
  },//设备号
  deviceString: {
    type: String,
  },//设备字符串
  firstChecked: {
    type: Boolean,
    default: false
  },//是否检查过
  transferNumber: {
    type: String,
    default: ()=>''
  },
  dndInfo: {
    type: String,
    default: function () {
      return 'off';
    }
  },//示忙状态 off/on
  failed: {
    type: String,
    default: function () {
      return 'deailway=hangup&number=';
    }
  },//deailway-呼叫失败处理方式:hangup,ivr,voicemail,fllowme,transfer
  ts: {
    type: Date,
    default: new Date()
  }

});
Extension.statics = {};
export default Extension;