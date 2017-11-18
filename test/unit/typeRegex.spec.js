const typeRegex = require('../../src/typeRegex')

describe('typeRegex', () => {
  describe('replace', () => {
    let clork
    const timestemp = Date.now()
    before(() => {
      clork = sinon.useFakeTimers(timestemp)
    })

    after(() => {
      clork.restore()
    })
    it('replace script tag, the tag src with no query', () => {
      const str = `<script type="text/javascript" src="../dist/index.min.js"></script>`
      const replacedStr = typeRegex.replace(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="../dist/index.min.js?t=${timestemp}"></script>`)
    })

    it('replace script tag, the tag src with query', () => {
      const str = `<script type="text/javascript" src="../dist/index.min.js?t=1510912034329"></script>`
      const replacedStr = typeRegex.replace(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="../dist/index.min.js?t=${timestemp}"></script>`)
    })
  })

  describe('filterTypes', () => {
    it(`input: script,css. should return ['script']`, () => {
      expect(typeRegex.filterTypes('script,css')).toEqual(['script'])
    })
  })
})