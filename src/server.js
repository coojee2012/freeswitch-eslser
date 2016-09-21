/**
 * Created by linyong on 9/21/16.
 */
"use strict";
require('newrelic');
require("babel-polyfill");

var CCServer  = require("./ESLSrv").default;
var APIServer = require("./APISrv").default;
var Runner = require("./ClusterRun").default;
var ccServer = new CCServer();
var apiServer = new APIServer();
new Runner([ccServer,apiServer]).run();