/**
 * @flow
 * Created by LinYong on 16-9-26.
 */
declare class Promise$Type {
all(promises: Object): void;
then(result: Function, err: Function): void;
}

declare function Promise(callback: (resolve: Function, reject: Function) => void): Promise$Type ;

declare module "es6-promise" {
  declare var Promise: Promise;
}
