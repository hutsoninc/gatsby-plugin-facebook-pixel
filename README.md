# @hutsoninc/gatsby-plugin-facebook-pixel

[![Current npm package version](https://img.shields.io/npm/v/@hutsoninc/gatsby-plugin-facebook-pixel.svg)](https://www.npmjs.com/package/@hutsoninc/gatsby-plugin-hubspot) 

A Gatsby plugin to easily add a Facebook Pixel embed code to your site.

## Installation

`npm install --save @hutsoninc/gatsby-plugin-facebook-pixel`

## Usage

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "@hutsoninc/gatsby-plugin-facebook-pixel",
      options: {
          pixelId: "YOUR_PIXEL_ID",
      },
    },
  ]
}
```

### `fbq` function

This plugin provides a [`fbq` function](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events) to prevent SSR issues.

To use it, simply import it and use it like the normal [`fbq` function](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events).

```
import { fbq } from '@hutsoninc/gatsby-plugin-facebook-pixel'

fbq('track', 'Contact')
```

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)