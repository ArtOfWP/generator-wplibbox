'use strict';
var os = require('os');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var path_exists = require('path-exists');
var fs = require('fs');
var tmpdir = path.join(process.cwd(), 'tmp');

describe('WpLibBox', function () {
  var gen = helpers
    .run(path.join(__dirname, '../generators/app'))
    .inDir(tmpdir)
    .withArguments('test-site')
    .withPrompts({
      'hostname':'test-site.dev',
      'box_name':'test-site',
      'box_description':'description test-site',
      'author_email':'example@example.org',
      'author_name':'Example Example',
      'author_role':'maintainer',
      'author_url':'http://example.org'
    });
  describe('default', function () {
    beforeAll(function(done){ gen.on('end', done)});
    it('creates a folder', function () {
      expect(path_exists.sync('test-site')).toBeTruthy();
    });
    it('copies required files', function() {
      expect(path_exists.sync('test-site/Vagrantfile')).toBeTruthy();
    });

    it('creates Vagrantfile with correct data', function(){
      var file = fs.readFileSync(tmpdir + '/test-site/Vagrantfile');
      expect(file).toContain('test-site.dev');
    });
  });
});
