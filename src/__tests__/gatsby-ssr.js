jest.useFakeTimers()

const env = process.env

const { onRenderBody } = require('../gatsby-ssr')

describe('gatsby-plugin-facebook-pixel', () => {
  beforeEach(() => {
    process.env = { ...env, NODE_ENV: 'test' }
  })

  describe('onRenderBody', () => {
    const setup = (options = {}) => {
      const setHeadComponents = jest.fn()

      onRenderBody({ setHeadComponents }, options)

      return { options, setHeadComponents }
    }

    it('reports when no pixelId is provided', () => {
      const { setHeadComponents } = setup()

      expect(setHeadComponents).toHaveBeenCalledTimes(0)
    })

    it('works when pixelId is provided', () => {
      const options = {
        pixelId: 1234567,
      }

      const { setHeadComponents } = setup(options)

      expect(setHeadComponents).toHaveBeenCalledTimes(1)

      const resultObj = setHeadComponents.mock.calls[0][0]

      expect(Array.isArray(resultObj)).toBe(true)
      expect(resultObj[0].type).toEqual('script')
      expect(resultObj[0].props.dangerouslySetInnerHTML.__html).toMatch(/1234567/)
    })

    it('does nothing when NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development'

      const options = {
        pixelId: 1234567,
      }

      const { setHeadComponents } = setup(options)

      expect(setHeadComponents).toHaveBeenCalledTimes(0)
    })
  })

  afterEach(() => {
    process.env = env
  })
})
