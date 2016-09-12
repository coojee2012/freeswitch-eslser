/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const RecordFile = new Mongoose.Schema({
  tenantId: {
    type: String,
    required: true
  },
  uniqueId:{
    type:String,
    unique:true,
    required:true
  },
  filename:   {
    type:String,
  }, //文件名
  extName:    {
    type:String,
  }, //扩展名
  fileSize:   {
    type:Number,
    default:function () { return 0; }
  },//文件大小
  callType:   {
    type:String,
  }, //主叫类型
  label:   {
    type:String,
  },//录音类型，queue,exten,ivr,voicemail等
  ts:    {
    type: String,
    default: function () { return moment().unix(); }
  },//创建时间
  extensionNumber:   {
    type:String,
  },//被叫
  folder:     {
    type:String,
  }, //目录
  callNumber: {
    type:String,
  }, //主叫
  doymicac:   {
    type:String,
  }
});
RecordFile.statics = {};
export default RecordFile;