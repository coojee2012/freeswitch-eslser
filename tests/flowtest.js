/* @flow */
/**
 * Created by linyong on 9/23/16.
 */
"use strict";
require('babel-core/register');
require('babel-polyfill');

var free = require('../src/adaptors/freeswitch/index').default;

free.answer().then(str =>{
  console.log(str);
});