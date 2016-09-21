#!/usr/bin/env node
/**
 * Created by LinYong on 10/30/2015.
 */
"use strict";

var fs = require("fs");
var exec = require("child_process").exec;

var globalEnv = ["gulp", "gulp-cli", "gulp-eslint", "gulp-mocha",
    "gulp-uglify", "gulp-babel", "gulp-util","gulp-sourcemaps",
    "gulp-concat","babel-preset-es2015","chai","should","mocha",
    "mocha-jenkins-reporter","eslint"
];


function ln(npmRoot, moduleName) {
    exec("ln -s " + npmRoot + "/" + moduleName + " node_modules/" + moduleName, function (err) {
        if (err) {
            console.log(err);
        }
    });
}


function getNpmRoot(cb) {
    exec("npm root -g", cb);
}

function run() {
    getNpmRoot(function (err, data) {
        var npmRoot = data.replace(/\r|\r\n|\s+/g,"");
        console.log(npmRoot);
        while (globalEnv.length > 0) {
            ln(npmRoot, globalEnv.pop());
        }
    });
}

run();



