"use strict";

var sails = require('sails');
var chalk = require('chalk');

before(function(done) {
  var lintOk = runLint();
  var doneMsg = null;
  if (lintOk) {
    console.log(chalk.green("Lint passed, proceeding with test."));
    this.timeout(5000);
     sails.lift({
      // configuration for testing purposes
    }, function(err, server) {
      sails = server;
      if (err) return done(err);
      // here you can load fixtures, etc.
      done(err, sails);
    });   
  } else {
    done(chalk.red("Lint Failed, halting test."));
  }
});

after(function(done) {
  sails.lower(done());
});

var runLint = function() {
  var CLIEngine = require('eslint').CLIEngine;
  var cli = new CLIEngine({});
  var format = 'stylish';
  var runLint = function (pattern, format) {
    var report = cli.executeOnFiles([pattern]);
    var formatter = cli.getFormatter(format);
    var lintOk = true;
    if (report && report.errorCount > 0) {
      console.log(chalk.red('Code did not pass lint rules') + formatter(report.results));
      lintOk = false;
    } else if ( report && report.warningCount > 0) {
      console.log(formatter(report.results));
    }
    return lintOk;
  }
  return runLint('api', format) && runLint('config', format);
};