/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const Trunk = new Mongoose.Schema({
  name:   {
    type:String,
  },
  proto:   {
    type:String,
  },
  prototype:  {
    type:String,
    default: function () { return ''; }
  },
  device:{
    type:String,
    default: function () { return ''; }
  },
  memo: {
    type:String,
    default: function () { return ''; }
  },
  ts:     {
    type: String,
    default: function () {return moment().format("YYYY-MM-DD HH:mm:ss"); }
  },
  args:    {
    type:String,
    default: function () { return ''; }
  }
});
Trunk.statics = {};
export default Trunk;