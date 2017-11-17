#!/usr/bin/env node

// 更新html文件中的静态资源文件缓存
const fs = require("fs")
const path = require('path')
const {regexp, timestempUrl} = require('./regexpConf')

class Refresh{
  constructor({types}){
    const validTypes = types.reduce((pre, type)=>{
      if(regexp[type]) pre.push(type);
      return pre
    }, [])
    this.option = {types: validTypes}

    const dir = process.env.DIR
    const {PWD, DIR} = process.env
    const targetPath = path.join(PWD, DIR)
    this.findFiles(targetPath)
  }

  findFiles(targetPath) {
    fs.readdir(targetPath, (err, files) => {
      files.forEach(file=>{
        if(!/.html$/.test(file)) return;
        return this.replaceUrl(`${targetPath}/${file}`)
      })
    })
  }

  replaceUrl(tail) {
    fs.readFile(tail, 'utf8', (err, data) => {
      if (err) throw err;

      const str = this.option.types.reduce((pre, type)=> pre.replace(regexp[type], timestempUrl), data)

      fs.writeFile(tail, str, (err) => {
        if (err) throw err;
        console.log('write index.html success!');
      })
    })
  }
}

new Refresh({types: ['script', 'style']})

