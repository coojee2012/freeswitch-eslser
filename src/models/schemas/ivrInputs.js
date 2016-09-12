/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const IvrInput = new Mongoose.Schema({
  ivrNumber:  {
    type:Number,
    required:true
  },
  general:   {
    type:Number,
    default:0
  },//0,普通按键；1，默认响应
  generalType:   {
    type:String,
  },//错误响应：包括无效按键或等待按键超时标识或重试次数设置【timeout,invalidkey,retry】
  generalArgs:   {
    type:String,
  },//错误响应参数
  inputNumber:   {
    type:Number,
  },
  gotoIvrNumber:   {
    type:Number,
  },
  gotoIvrActId:   {
    type:Number,
    default:1
  }
});
IvrInput.statics = {};
export default IvrInput;