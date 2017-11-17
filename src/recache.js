const fs = require("fs")
const path = require('path')
const typeRegex = require('./typeRegex')

class Recache{
  constructor(dir, {types, quiet=false}){
    const targetPath = path.join(process.env.PWD, dir)
    this.findFiles(targetPath, typeRegex.filterTypes(types), quiet)
  }

  findFiles(targetPath, types, quiet) {
    fs.readdir(targetPath, (err, files) => {
      files.forEach(file=>{
        if(!/.html$/.test(file)) return;

        const tail = `${targetPath}/${file}`
        return fs.readFile(tail, 'utf8', (err, data) => {
          if (err) throw err;
          const str = types.reduce((pre, type)=> typeRegex.replace(pre, type), data)

          fs.writeFile(tail, str, (err) => {
            if (err) throw err;
            !quiet && console.log(`success: file = ${file}`);
          })
        })
      })
    })
  }
}

module.exports = Recache