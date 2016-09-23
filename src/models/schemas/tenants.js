/**
 * Created by linyong on 9/23/16.
 */
import Mongoose from 'mongoose';

const Tenant = new Mongoose.Schema({
  tenantId: {
    type: String,
    unique:true,
    required: true
  },
  tenantName: {
    type: String,
    default:''
  },
  status: {
    type: String,
    required:true,
    default:()=>''
  },//租户电话状态,[开通,待开通,待审核等]
  dnd: {
    type: String,
    default: function () {
      return '';
    }
  },//开通的电话号码,
  balance: {
    type: Number,
    default: 0.00
  },//当前话费余额
  consume: {
    type: Number,
    default: 0.00
  },//总消费额
  location: {
    type: String,
    default: 'zh'
  },//国家或地区[zh,tw,hk等]
  lm: {
    type: Date,
    default: null
  },//上次修改时间
  ts: {
    type: Date,
    default: ()=>new Date()
  }

});
Tenant.statics = {};
export default Tenant;