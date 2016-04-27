var _ = require("lodash");
var generators = require('yeoman-generator');
var nfs = require('fs');
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', {type: String, required: true});
//    this.options = {};
  },
  /**
   * author.email
   author.name
   author.role
   author.url
   box.description
   box.name
   hostname
   */
  prompting: function () {
    this.log('Configure your box setup');
    var done = this.async();
    this.prompt(
      [
      {
      type: 'input',
      name: 'hostname',
      message: 'Hostname:',
      default: this.appname + '.dev'
      },
      {
        type: 'input',
        name: 'box_name',
        message: 'Box name:',
        default: this.appname
      },
      {
        type: 'input',
        name: 'box_description',
        message: 'Box description:',
        default: "Provides a box for " + this.appname
      },      {
        type: 'input',
        name: 'author_name',
        message: 'Author name:',
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'author_email',
        message: 'Author email:',
        default: this.user.git.email()
      },
      {
        type: 'input',
        name: 'author_url',
        message: 'Author url:'
      },
      {
        type: 'input',
        name: 'author_role',
        message: 'Role:',
        default: 'Maintainer'
      }
      ], function (answers) {
        this.data = {};
        this.data.hostname = this.appname;
        this.data.author = {};
        this.data.author.name = answers.author_name;
        this.data.author.url = answers.author_url;
        this.data.author.email = answers.author_email;
        this.data.author.role = answers.author_role;
        this.data.hostname = answers.hostname;
        this.data.box = {};
        this.data.box.name = answers.box_name;
        this.data.box.description = answers.box_description;
        done();
    }.bind(this));
  },
  makeBox: function () {
    var destDir = this.destinationPath(this.appname);
    nfs.mkdirSync(destDir);
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(this.appname),
      this.data
    );
  }
});