// 静态文件类型配置

class TypeRegex {
  constructor(){
    const srcUrl = `(\\S*\\.\\w+)(\\?\\S*)?`
    this.regexp = {
      script: new RegExp(`(<script\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/script>)`, 'g'),
      style: new RegExp(`(<style\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/style>)`, 'g'),
      link: new RegExp(`(<link\\s*.*href=[\\"\\'])${srcUrl}([\\"\\']\\s*.*>)`, 'g'),
    }

    this.replaceExpression = () => `$1$2?t=${Date.now()}$4`
  }

  replace(str, type) {
    if(!this.regexp[type]) return str;
    return str.replace(this.regexp[type], this.replaceExpression())
  }

  filterTypes(types) {
    return types.split(',').reduce((pre, type)=>{
      if(this.regexp[type]) pre.push(type);
      return pre
    }, [])
  }
}

module.exports = new TypeRegex()