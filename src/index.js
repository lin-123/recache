#!/usr/bin/env node

const program = require('commander');
const Recache = require('./recache')
const {version} = require('../package.json')

program.arguments('<dir>')
  .name('recache')
  .version(version)
  .option('-t, --types <type>', 'recache file types, default is <script,style,link>')
  .option('-q, --quiet', 'recache will not print anything')
  .option('-r, --restore', 'remove t=timestemp from files')
  .action(function(dir) {
    new Recache(dir, program)
  })
  .parse(process.argv);
