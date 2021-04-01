jest.useFakeTimers()

const env = process.env

const { onRouteUpdate } = require('../gatsby-browser')

describe('gatsby-plugin-facebook-pixel', () => {
  beforeEach(() => {
    process.env = { ...env, NODE_ENV: 'test' }
  })

  describe('onRouteUpdate', () => {
    const location = {
      hash: '#hash',
      pathname: '/page',
      search: '?search',
    }

    beforeEach(() => {
      global.window = Object.assign(global.window, {
        fbq: jest.fn(),
        requestAnimationFrame: jest.fn(cb => {
          cb()
        }),
      })
    })

    it('tracks page view', () => {
      process.env.NODE_ENV = 'production'

      onRouteUpdate({ location })

      expect(global.window.fbq).toHaveBeenCalledTimes(1)
      expect(global.window.fbq).toHaveBeenCalledWith('track', 'PageView')
    })

    it('tracks multiple page views', () => {
      process.env.NODE_ENV = 'production'

      onRouteUpdate({ location })

      onRouteUpdate({
        location: {
          hash: '',
          pathname: '/page/sub-page',
          search: '',
        },
      })

      expect(global.window.fbq).toHaveBeenCalledTimes(2)
    })

    it('does nothing when window.fbq is undefined', () => {
      delete global.window.fbq

      onRouteUpdate({ location })

      expect(global.window.fbq).toBeUndefined()
    })

    it('does nothing when process.env.NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development'

      onRouteUpdate({ location })

      expect(global.window.fbq).toHaveBeenCalledTimes(0)
    })
  })

  afterEach(() => {
    process.env = env
  })
})
