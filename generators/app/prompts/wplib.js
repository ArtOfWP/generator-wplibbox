module.exports = function (generator, callback) {
  generator.log('Configure WPLib');
  generator.prompt(
    [
      {
        type: 'input',
        name: 'wplib_enable',
        message: 'Enable WPLib:',
        default: false
      }
    ],
    function (answers) {
      var data = {};
      data.wplib = {};
      data.wplib.enable = answers.wplib_enable;
      callback(data);
    }
  );
};
