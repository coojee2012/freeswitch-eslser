/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const Cdr = new Mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },//有别于callId,一个callId可能存在多个cdr,比如转接什么的
  callId: {
    type: String,
    required: true,
  },
  caller: {
    type: String,
    required: true
  },
  called: {
    type: String,
    required: true
  },
  accountCode: {
    type: String,
  },
  srcChannel: {
    type: String,
  },
  desChannel: {
    type: String,
  },

  threaDID: {
    type: String,
  },
  context: {
    type: String,
  },
  agiType: {
    type: String,
  },
  alive: {
    type: String,
    default: ()=>"yes"
  },
  starTime: {
    type: Date,
    default: ()=>new Date()
  },
  lastAppTime: {
    type: Date,
    default: ()=>null
  },//上次应用模块发生的时间
  endTime: {
    type: Date,
    default: ()=>null
  },//线路挂断时间
  routerLine: {
    type: String,
  },
  lastApp: {
    type: String,
  },
  answerStatus: {
    type: String,
    enmu: {
      values: 'answered,noAnswered'.split(','),
      message: ''
    },
    default: ()=>'noAnswered'
  }
});

Cdr.statics = {}
export default Cdr;
