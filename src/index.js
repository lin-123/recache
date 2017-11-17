#!/usr/bin/env node

const program = require('commander');
const Recache = require('./recache')
const {version} = require('../package.json')

program.arguments('<dir>')
       .version(version)
       .option('-t, --types <type>', 'recache file types, default is <script,style,link>')
       .option('-q, --quiet <type>', 'recache will not print anything')
       .action(function(dir) {
          new Recache(dir, program)
       })
       .parse(process.argv);