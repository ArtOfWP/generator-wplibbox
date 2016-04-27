module.exports = function(generator, callback) {
  generator.prompt(
  [
    {
      type: 'input',
      name: 'organisation',
      message: 'Organisation:',
      default: generator.appname
    },
    {
      type: 'input',
      name: 'hostname',
      message: 'Hostname:',
      default: generator.appname + '.dev'
    },
    {
      type: 'input',
      name: 'box_name',
      message: 'Box name:',
      default: generator.appname
    },
    {
      type: 'input',
      name: 'box_description',
      message: 'Box description:',
      default: "Provides a box for " + generator.appname
    },      {
    type: 'input',
    name: 'author_name',
    message: 'Author name',
    default: generator.user.git.name()
  },
    {
      type: 'input',
      name: 'author_email',
      message: 'Author email:',
      default: generator.user.git.email()
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
      var data = {};
      data.hostname = generator.appname;
      data.author = {};
      data.author.name = answers.author_name;
      data.author.url = answers.author_url;
      data.author.email = answers.author_email;
      data.author.role = answers.author_role;
      data.hostname = answers.hostname;
      data.box = {};
      data.box.organisation = answers.organisation;
      data.box.name = answers.box_name;
      data.box.description = answers.box_description;
      callback(data);
  });
};