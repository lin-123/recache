class Log {
  constructor(debug = false) {
    this.debug = debug
    ;['info', 'warn'].forEach(key => {
      this[key] = (msg) => debug && console[key]('#mqtt-lite# ', msg)
    })
    this.error = (msg) => console.error('#mqtt-lite# ', msg)
  }
}

module.exports = Log