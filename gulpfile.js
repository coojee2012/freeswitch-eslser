/**
 * * Created by LinYong on 10/27/2015.
 */
var gulp = require("gulp");
var clean = require("gulp-clean");

var gutil = require("gulp-util");
var eslint = require("gulp-eslint");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var exec = require("child_process").exec;
var packageConf = require("./package.json");

var args = require('yargs').argv;
var version = packageConf.version;
var branch = args.branch || "";
var buildNumber = args.build_number || "1";
var dockerBranch = args.docker_branch || "master";
var runEnv = args.run_env || "production";

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

gutil.log("Now", ",we are doing the auto task!For item version:", gutil.colors.magenta(version));
gutil.beep();


gulp.task("npm", function (cb) {
  // build Jekyll
  exec("cnpm install --production", function (err) {
    if (err) return cb(err); // return error
    cb(); // finished task
  });
});


gulp.task("eslint", function () {
  return gulp.src(["./src/**/*.js"])
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task("build_docker", ['dist'], function (cb) {
  // build Jekyll
  var reg = new RegExp('^' + dockerBranch);
  if (reg.test(branch)) {
    exec('docker build -t registry.yunkefu.cc/unicall/faq-api:' + version + '.' + buildNumber + ' .', function (err, stdout, stderr) {
      console.log(stdout);
      if (err) return cb(err); // return error
      cb(); // finished task
    });
  } else {
    cb();
  }

});

gulp.task('push_docker', ['build_docker'], function (cb) {
  // build Jekyll
  var reg = new RegExp('^' + dockerBranch);
  if (reg.test(branch)) {
    exec('docker push registry.yunkefu.cc/unicall/faq-api:' + version + '.' + buildNumber, function (err, stdout, stderr) {
      console.log(stdout);
      console.log('Build Docker:', 'registry.yunkefu.cc/unicall/faq-api:' + version + '.' + buildNumber);
      if (err) return cb(err); // return error
      cb(); // finished task
    });
  } else {
    cb();
  }
});


gulp.task('tagGit', ['push_docker'], function (cb) {
  // build Jekyll
  var reg = new RegExp('^' + dockerBranch);
  if (reg.test(branch)) {
    exec("git tag -a " + version + "." + buildNumber + " -m 'tagged by Jenkins' && git push origin --tags", function (err) {
      if (err) return cb(err); // return error
      cb(); // finished task
    });
  } else {

    cb();
  }
});


gulp.task("webpack:build", ['clean'], function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production"),
         // "CONF_ENV": JSON.stringify(runEnv)
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});


gulp.task("webpack:build-dev", ['clean'], function (callback) {
  // modify some webpack config options
  var myDevConfig = Object.create(webpackConfig);
  myDevConfig.plugins = myDevConfig.plugins.concat(
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("development"),
          "CONF_ENV": JSON.stringify("development")
        }
      }),
      new webpack.BannerPlugin('require("source-map-support").install();',
          {raw: true, entryOnly: false})
  );
  myDevConfig.devtool = "sourcemap";
  myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);
  // run webpack
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});


gulp.task("copy", ['webpack:build'], function () {
  return gulp.src(["./package.json", "./jenkinsEnv.js", "./newrelic.js", "./.babelrc"], {base: "./"})
      .pipe(gulp.dest("build/"));
});

// 清理
gulp.task("clean", function () {
  return gulp.src(["build/*"], {read: false}).pipe(clean());
});
gulp.task("test", ["eslint"]);
gulp.task("dev", ["clean", "webpack:build-dev"]);
gulp.task("dist", ["clean", "webpack:build", "copy"]);
gulp.task("build", ["dist", "build_docker", "push_docker", "tagGit"]);
