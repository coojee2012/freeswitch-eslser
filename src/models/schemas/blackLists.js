/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const BlackList = new Mongoose.Schema({
  memo:{
    type:String,

    default:  () => { return ''; }
  },//添加成黑名单的原因
  ts: {
    type:Date,
    default:  () => { return new Date(); }}
});
BlackList.statics = {};
export default BlackList;