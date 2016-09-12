/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const IvrAction = new Mongoose.Schema({
  ivrNumber: {
    type:Number,
  },
  ordinal: {
    type: Number,
    default:0
  },
  actionType: {
    type: Number,
    default:1
  },
  args: {
    type: String,
  }
});
IvrAction.statics = {};
export default IvrAction;