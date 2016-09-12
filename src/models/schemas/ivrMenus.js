/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const IvrMenu = new Mongoose.Schema({
  ivrName:   {
    type:String,
    required:true
  },
  description:   {
    type:String,
  },
  ts:   {
    type: String,
    default:()=>new Date()
  },
  readOnly:   {
    type:Boolean,
    default:false
  }
});
IvrMenu.statics = {};
export default IvrMenu;