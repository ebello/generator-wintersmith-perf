import path from 'path'
import fs from 'fs'
import expect from 'expect'

let exec = require('child_process').exec;

describe('StaticSite', () => {
  var instancePath = path.join(__dirname, '../');
  var indexHtml = path.join(instancePath, 'build/index.html');
  var gulp = '$(which gulp)';
  var deployPrepareCmd = gulp + ' deploy:prepare';
  
  it('builds the site', function(done) {
    this.timeout(10000);

    // test the deploy:prepare command
    exec(deployPrepareCmd, {
      cwd: instancePath
    }, function (err, stdout) {
      expect(function() {
        fs.accessSync(indexHtml, fs.F_OK)
      }).toNotThrow();

      var txt = fs.readFileSync(indexHtml).toString('utf-8');
      expect(txt).toMatch(/Wintersmith/);
      expect(txt).toMatch(/\/assets\/all-b9610b10be.css/);
      expect(txt).toMatch(/\/assets\/vendor\/modernizr-91f8a42384.min.js/);
      expect(txt).toMatch(/\/assets\/main-2b3f92352f.js/);
      done();
    });
  });

  
});
