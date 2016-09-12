/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const LocalNumber = new Mongoose.Schema({
  number:{
    type:Number,
    unique:true,
    required:true
  },
  localType:   {
    type:String,
    required:true
  },
  assign:   {
    type: String,
  }
});
LocalNumber.statics = {};
export default LocalNumber;