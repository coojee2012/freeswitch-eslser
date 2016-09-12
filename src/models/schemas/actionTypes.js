/**
 * Created by linyong on 9/12/16.
 */
import Mongoose from 'mongoose';
/**
 执行动作参数说明：
 1、播放语音：interruptible：允许按键中断，【'true'/'false'】,默认为true
 folder:语音目录，相对于：/var/lib/asterisk/sounds/cn/
 filename:语音文件名
 下面参数在interruptible=true时有效
 retrytime：允许重听的次数，默认为3
 timeout：等待按键超时时间，毫秒，默认为10000
 failivrnum：获取按键失败处理IVR号码，默认为挂机IVR
 failactid：获取按键失败处理IVR号码动作编号，默认为0

 2、发起录音：varname：需要播放的录音变量名
 format：播放的录音格式
 maxduration：默认最多可以录制1小时，0表示随便录好久
 options：默认如果没应答就跳过录音
 【    a - 在已有录音文件后面追加录音.
 n - 即使电话没有应答，也要录音.
 q - 安静模式（录音前不播放beep声）.
 s - 如果线路未应答，将跳过录音.
 t - 用*号终止录音，代替默认按#号终止录音
 x - 忽略所有按键，只有挂机才能终止录音.
 k - 保持录音，即使线路已经挂断了.
 y - 任何按键都可以终止录音.】
 silence：如果持续了超过X秒的沉默，将停止录音，默认10秒,0表示不判断

 3、播放录音：varname：需要播放的录音变量名
 format：播放的录音格式

 4、录制数字字符：maxdigits：最大接收字符数，默认为20
 beep：【true/false】，录制字符前是否播放beep声，默认为false
 varname：保存的变量名，仅在当前会话有效
 addbefore：【true/false】,是否保存用户上一次的输入，默认为false

 5、读出数字字符：varname：需读出的变量名，仅在当前会话有效
 digits：直接读出给定的数字字符

 6、拨打号码：varname：从会话中保存的变量获取号码
 digits：指定号码
 dialway：拨打方式【diallocal/dialout】

 7、数字方式读出

 8、读出日期时间

 9、检测日期
 10、主叫变换
 11、检查号码归属地
 12、跳转到语音信箱
 13、跳转到IVR菜单
 14、WEB交互接口
 15、AGI扩展接口
 16、等待几秒
 17、播放音调
 18、挂机
 **/
const ActionType = new Mongoose.Schema({
  typeNumber:{
    type:Number,
    unique: true,
    required: true,
  },
  typeName: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
  },//check,read,record,control
  icoName: {
    type: String,
  },
  memo: {
    type: String,
  }
});
ActionType.statics = {};
export default ActionType;