'use strict';
var generators = require('yeoman-generator');
var nfs = require('fs');
var pathExists = require('path-exists');
var chalk = require('chalk');
module.exports = generators.Base.extend({
  site_name: undefined,
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('site_name', {type: String, required: false});
    this.data = {};
    if (this.site_name === undefined) {
      this.log('Note: You need to call `yo wplibbox:add-site your-domain`');
      process.exit(1);
    }
    if (!pathExists.sync(this.destinationPath('www'))) {
      this.log.error(chalk.red('You need to call `yo wplibbox:add-site your-domain` in the root of the box folder'));
      process.exit(1);
    }
    this.site_folder = this.site_name;
    if (pathExists.sync(this.destinationPath('www/' + this.site_folder))) {
      this.log.identical(chalk.red('The site `') + chalk.blue(this.site_name) + chalk.red('` already exist.'));
      process.exit(1);
    }

    this.data.site_name = this.site_name;
  },
  addSite: function () {
    var destDir = this.destinationPath('www/' + this.site_folder);
    nfs.mkdirSync(destDir);
    nfs.mkdirSync(destDir + '/composer-extensions/');
    this.data.site_name = this.site_name;
    this.data.site_folder = this.site_folder;
    this.data.db_name = this.data.site_name.replace(/[-\.]/g, '_');
    this.data.hostname = this.site_name;
    this.data.box = {};
    this.data.author = {};
    this.data.box.organisation = 'temp-org';
    this.data.box.name = this.data.site_name.replace(/[\.]/g, '-');
    this.data.author.name = 'example';
    this.data.author.email = 'example@example.org';
    this.data.author.role = false;
    this.data.author.url = false;
    this.data.box.description = 'Alter this';
    nfs.appendFileSync(this.destinationPath('www/.hosts'), this.site_name + '\n');
    this.sourceRoot(this.sourceRoot() + '/../../templates');
    this.fs.copyTpl(
      this.templatePath('shared'),
      this.destinationPath('www/' + this.site_folder),
      this.data);
    this.log(chalk.green('Run `') + chalk.blue('vagrant provision') + chalk.green('` to initiate the site'));
  }
});
