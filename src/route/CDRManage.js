/**
 * Created by linyong on 9/21/16.
 */
const CreateCDRRecord= () =>{
  const _this = this;
  const model = _this.DBModels['pbx_cdrs'];
  const data = {
    uniqueId:'',
    callId:'',
    caller:'',
    called:''
  }
  const entity = new model(data);
  return entity.save();
}
const UpdateCDRRecord= () =>{
  const _this = this;
  const model = _this.DBModels['pbx_cdrs'];
  const data = {
    uniqueId:'',
    callId:'',
    caller:'',
    called:''
  }
}
export {CreateCDRRecord,UpdateCDRRecord}