/**
 * Created by linyong on 9/2/16.
 */
"use strict";
require('babel-core/register');
require('babel-polyfill');
var CCServer  = require("../src/ESLSrv").default;
var APIServer = require("../src/APISrv").default;
var Runner = require("../src/ClusterRun").default;
var ccServer = new CCServer();
var apiServer = new APIServer();
new Runner([ccServer,apiServer]).run();


//ccServer.run();
//apiServer.run();