/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const ExtensionGroup = new Mongoose.Schema({
  groupName: {
    type: String,
  },
  memo: {
    type: String,
  },
  ts: {
    type: Date,
    length: 50,
    default: () => new Date()
  }

})
;
ExtensionGroup.statics = {};
export default ExtensionGroup;