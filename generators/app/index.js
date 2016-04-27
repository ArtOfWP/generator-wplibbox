var _ = require("lodash");
var generators = require('yeoman-generator');
var nfs = require('fs');
var filter = require('gulp-filter');
var beautify = require('gulp-beautify');
var merge = require('merge');
var compose = require('./prompts/composer-description');
var wplib = require('./prompts/wplib');
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', {type: String,required:false});
    this.data = {};
    if (this.appname === undefined) {
      this.log('Note: You need to call `yo wplibbox your-box-name`');
      process.exit(1);
    }
  },
  prompting: function () {
    this.log('Configure your box setup');
    var done = this.async();
    compose(this, function(answers) {
      "use strict";
      this.data = merge(this.data, answers);
      wplib(this, function (answers) {
        "use strict";
        this.data = merge(this.data, answers);
        done();
      }.bind(this))
    }.bind(this));
  },
  makeBox: function () {
    var destDir = this.destinationPath(this.appname);
    nfs.mkdirSync(destDir);
    this.data.appname = this.appname;
    var tsFilter = filter(['**/*.json'], { restore: true });

    this.registerTransformStream(tsFilter);
    this.registerTransformStream(beautify({
      indentSize: 2
    }));
    this.registerTransformStream(tsFilter.restore);
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(this.appname),
      this.data
    );
  }
});