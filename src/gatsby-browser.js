exports.onRouteUpdate = function () {
  if (process.env.NODE_ENV !== 'production' || typeof fbq !== 'function') {
    return
  }

  // Wrap inside a timeout to make sure react-helmet is done with its changes (https://github.com/gatsbyjs/gatsby/issues/11592)
  const trackPageView = () => {
    window.fbq('track', 'PageView')
  }

  if (typeof window.requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      requestAnimationFrame(trackPageView)
    })
  } else {
    // Simulate 2 requestAnimationFrame calls
    setTimeout(trackPageView, 32)
  }
}
