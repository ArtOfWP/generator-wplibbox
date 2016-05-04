/* global beforeAll, describe, it, expect */
'use strict';
var helpers = require('yeoman-test');
var path = require('path');
var pathExists = require('path-exists');
var fs = require('fs');

describe('WpLibBox', function () {
  var tmpdir;
  var gen = helpers
    .run(path.join(__dirname, '../generators/add-site'))
    .inTmpDir(function (tmpdir2) {
      tmpdir = tmpdir2;
      if (!pathExists.sync(tmpdir + '/www')) {
        fs.mkdirSync(tmpdir + '/www/');
      }
      fs.writeFileSync(tmpdir + '/www/.hosts', 'app-site.dev\n');
    })
    .withArguments('test-site2.dev');
  describe('add-site', function () {
    beforeAll(function (done) {
      gen.on('end', done);
    });

    it('creates a site folder', function () {
      expect(pathExists.sync(tmpdir + '/www/test-site2.dev')).toBeTruthy();
    });
    it('creates .hosts file with correct data', function () {
      var file = fs.readFileSync(tmpdir + '/www/.hosts');
      expect(file).toContain('test-site2.dev');
    });
    it('creates wp-config.php file with correct data', function () {
      var file = fs.readFileSync(tmpdir + '/www/test-site2.dev/wp-config.php');
      expect(file).toContain('$_SERVER[\'HTTP_HOST\'] = \'test-site2.dev\';');
      expect(file).toContain('define( \'DB_NAME\', \'test_site2_dev\' )');
    });
    it('creates wp-cli.yml file with correct data', function () {
      var file = fs.readFileSync(tmpdir + '/www/test-site2.dev/wp-cli.yml');
      expect(file).toContain('path: /var/www/test-site2.dev/wp/');
      expect(file).toContain('url: http://test-site2.dev/');
    });
  });
});
