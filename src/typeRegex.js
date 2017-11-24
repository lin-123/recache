// 静态文件类型配置

class TypeRegex {
  constructor(){
    const srcUrl = `(\\S*\\.\\w+)(\\?\\S*)?`
    this.regexp = {
      script: new RegExp(`(<script\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/script>)`, 'g'),
      style: new RegExp(`(<style\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/style>)`, 'g'),
      link: new RegExp(`(<link\\s*.*href=[\\"\\'])${srcUrl}([\\"\\']\\s*.*>)`, 'g'),
    }
  }

  /**
   * remove t=timestemp
   * @param {string} str
   * @param {string} type ['script' or 'style' or 'link']
   */
  restore(str, type) {
    if(!this.regexp[type]) return str;
    return str.replace(this.regexp[type], `$1$2$4`)
  }

  /**
   * replace string
   * @param {string} str
   * @param {string} type ['script' or 'style' or 'link']
   */
  replace(str, type) {
    if(!this.regexp[type]) return str;
    return str.replace(this.regexp[type], `$1$2?t=${Date.now()}$4`)
  }

  filterTypes(types = 'script,style,link') {
    return types.split(',').reduce((pre, type)=>{
      if(this.regexp[type]) pre.push(type);
      return pre
    }, [])
  }
}

module.exports = new TypeRegex()