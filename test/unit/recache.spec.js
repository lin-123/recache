const fs = require('fs')
const path = require('path')

const Recache = require('../../src/recache')

describe('recache', () => {
  describe('findFiles', () => {
    let clork
    const now = 1483228800000
    const dir = 'test/unit'
    before(() => clork = sinon.useFakeTimers({
                now,
                shouldAdvanceTime: true
            }))

    after(() => {
      clork.tick(500)
      new Recache(dir, {})
      clork.restore()
    })

    it('normal, just style will be repalce', (done) => {

      new Recache( dir, {types: 'style', quiet: true})
      setTimeout(() => {
        const tail = path.join(process.env.PWD, dir, './test.html')
        fs.readFile(tail , 'utf8', (err, data) => {
          const reg = new RegExp(now, 'g')
          expect(data.match(reg).length === 1).toEqual(true)
          done()
        })
      }, 100)
    })
  })
})