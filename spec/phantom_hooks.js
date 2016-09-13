// https://blog.engineyard.com/2015/measuring-clientside-javascript-test-coverage-with-istanbul
module.exports = {
  afterEnd: function(runner) {
    var fs = require('fs');
    var coverage = runner.page.evaluate(function() {
      return window.__coverage__;
    });
    if (coverage) {
      console.log('Writing coverage to coverage/coverage.json');
      fs.write('coverage/coverage.json', JSON.stringify(coverage), 'w');
    } else {
      console.log('No coverage data generated');
    }
  }
};
