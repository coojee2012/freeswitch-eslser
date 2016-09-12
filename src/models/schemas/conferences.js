/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';
const Conference = new Mongoose.Schema({
  pinCode: {
    type: String,
  },//进入会议室的密码
  playWhenEvent: {
    type: Number,
    default: 0
  },//播放音乐当离开时
  mohWhenOnlyOne: {
    type: Number,
    default: 0
  },//只有一个人是播放等待音乐
  ts: {
    type: Date,
    default: ()=>new Date()
  }
});
Conference.statics = {};
export default Conference;