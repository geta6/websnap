#!/usr/bin/env node

var os = require('os')
  , fs = require('fs')
  , path = require('path')
  , webshot = require('webshot')
  , program = require('commander')
  , errors = [];

program
.version(require(path.resolve('package.json')).version)
.usage('[options] <output>')
.option('-u, --url <url>', 'url')
.option('-o, --output <path>', 'image output path')
.option('--width <width>', 'width', 1024)
.option('--height <height>', 'height', 768)
.option('--phantom <path>', 'phantomjs path', path.join(__dirname, 'node_modules', '.bin', 'phantomjs'))
.parse(process.argv);

if (!program.url)
  errors.push(process.argv[0] + ': option -u, --url required');
if (!program.output && !program.binary)
  errors.push(process.argv[0] + ': option -o, --output required');
if (0 < errors.length) {
  console.log(errors.join('\n'));
  process.exit(1);
}

webshot(program.url, program.output, {
  phantomPath: program.phantom,
  phantomConfig: {'ssl-protocol': 'any'},
  screenSize: {width: program.width, height: program.height}
}, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});

