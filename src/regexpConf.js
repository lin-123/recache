const srcUrl = `(\\S*\\.\\w+)(\\?\\S*)?`
module.exports = {
  regexp: {
    script: new RegExp(`(<script\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/script>)`, 'g'),
    style: new RegExp(`(<style\\s.*src=[\\"|\\'])${srcUrl}([\\"|\\']\\s*.*><\\/style>)`, 'g'),
    link: new RegExp(`(<link\\s*.*href=[\\"\\'])${srcUrl}([\\"\\']\\s*.*>)`, 'g'),
  },
  timestempUrl: `$1$2?t=${Date.now()}$4`
}
