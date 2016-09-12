/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const Sound = new Mongoose.Schema({
  filename: {
    type: String,
  },//文件名
  extName: {
    type: String,
  },//扩展名
  folder: {
    type: String,
  },//文件夹
  description: {
    type: String,
  },//描述
  label: {
    type: String,
  },//标签
  associate: {
    type: String,
  },//关联
  readOnly: {
    type: Boolean,
    default: false
  },//系统只读
  ts: {
    type: Date,
    default: ()=>Date()
  },
});
Sound.statics = {};
export default Sound;