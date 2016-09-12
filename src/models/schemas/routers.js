/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';

const Router = new Mongoose.Schema({
  tenantId: {
    type: String,
    required: true
  },
  priority:   {
    type:Number
  },//执行顺序（优先级）
  createMode:   {
    type:Boolean,
    default:false 
  },//系统默认
  routerLine:   {
    type:String,
    default: function () { return '呼入'; }
  },//路由方式，呼出，呼入
  routerName:{
    type:String,
  },//规则名称
  optExtra:  {
    type:String,
  },//扩展属性
  lastWhenDone:   {
    type:Boolean,
    default:false
  },//最终匹配规则
  callerGroup:    {
    type:String,
  },//匹配主叫组（呼出对应分机分组，呼入对应中继分组）
  callerId:    {
    type:String,
  },//匹配主叫以什么开头
  callerLen:    {
    type:Number,
    default: function () { return 0 ;}
  },//匹配主叫长度
  calledNum:     {
    type:String,
  },//匹配被叫以什么开头
  calledLen:    {
    type:Number,
    default: function () { return 0 ;}
  },//匹配被叫长度
  replaceCallerId:   {
    type:String,
  },//匹配后主叫替换
  replaceCalledTrim:   {
    type:Number,
    default: function () { return 0 ;}
  },//匹配后删除被叫前几位
  replaceCalledAppend: {
    type:String,
  },//匹配后补充被叫前几位
  processMode:{
    type:String,
  },//处理方式 【黑名单，本地处理，拨打外线】
  processedFined:   {
    type:String,
  }//处理详细参数定义
});
Router.statics = {};
export default Router;