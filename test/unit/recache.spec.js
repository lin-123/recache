const fs = require('fs')
const path = require('path')

const Recache = require('../../src/recache')

describe('recache', () => {
  describe('findFiles', () => {
    let clork
    const now = 1483228800000
    const dir = 'test/unit'
    beforeEach(() => clork = sinon.useFakeTimers({
                now,
                shouldAdvanceTime: true
            }))

    afterEach(() => {
      clork.tick(500)
      new Recache(dir, {quiet: true, restore: true})
      clork.restore()
    })

    const getFileData = (cb) => {
      setTimeout(() => {
        const tail = path.join(process.env.PWD, dir, './test.html')
        fs.readFile(tail , 'utf8', cb)
      }, 100)
    }

    it('normal, just style will be repalce', (done) => {
      new Recache(dir, {types: 'style,link', quiet: true})
      getFileData((err, data) => {
        const reg = new RegExp(now, 'g')
        expect(data.match(reg).length).toEqual(2)
        done()
      })
    })

    it('normal, replaced style will be restore', (done) => {
      new Recache(dir, {types: 'style', quiet: true})
      setTimeout(() => {
        new Recache(dir, {types: 'style', quiet: true, restore: true})
      }, 10)

      getFileData((err, data) => {
        const reg = new RegExp(now, 'g')
        expect(data.match(reg)).toEqual(null)
        done()
      })
    })
  })
})