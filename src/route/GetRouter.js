/**
 * Created by linyong on 9/21/16.
 */
const GetRouters = () => {
  const _this = this;
  const model = _this.DBModels['pbx_routers'];

  return Promise((resolve, reject)=> {
    model.find({
          tenantId: _this.tenantId
        }, {}, {lean: true})
        .then(docs => {
          resolve(docs);
        })
        .catch(err=> {
          reject(err);
        })
  });
}
export default GetRouters;