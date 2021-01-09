[![view on npm](https://img.shields.io/npm/v/avatar-initials.svg)](https://www.npmjs.org/package/avatar-initials)
[![npm module downloads](https://img.shields.io/npm/dt/avatar-initials.svg)](https://www.npmjs.org/package/avatar-initials)
[![Build Status](https://travis-ci.com/MatthewCallis/avatar.svg?branch=master)](https://travis-ci.com/MatthewCallis/avatar)
[![Dependency Status](https://david-dm.org/MatthewCallis/avatar.svg)](https://david-dm.org/MatthewCallis/avatar)
[![Coverage Status](https://coveralls.io/repos/github/MatthewCallis/avatar/badge.svg?branch=master)](https://coveralls.io/github/MatthewCallis/avatar?branch=master)
[![Tree-Shaking Support](https://badgen.net/bundlephobia/tree-shaking/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Dependency Count](https://badgen.net/bundlephobia/dependency-count/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Minified + GZip](https://badgen.net/bundlephobia/minzip/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Minified](https://badgen.net/bundlephobia/min/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)

# [Avatar](http://matthewcallis.github.io/avatar/)

Avatar is a JavaScript library for showing [Gravatars](https://en.gravatar.com/) or generating user avatars.

## Examples

There are several examples [on the website](http://matthewcallis.github.io/avatar/).

```js
import Avatar from 'avatar-initials';
// or
const Avatar = require('avatar-initials')

// Add an avatar to an <img>
const avatar = Avatar.from(document.getElementById('avatar'), {
  'useGravatar': false,
  'initials': 'MC',
});

// If you just want the URL / string:
const github_avatar_url = Avatar.githubAvatar({
  id: '12345'
});

const gravatar_url_from_email = Avatar.gravatarUrl({
  email: 'test@test.test'
});

const gravatar_url_from_hash = Avatar.gravatarUrl({
  hash: '12929016fffb0b3af98bc440acf0bfe2'
});

const initial_png = Avatar.initialAvatar({
  initials: 'MC',
  initial_fg: '#888888',
  initial_bg: '#f4f6f7',
  initial_size: 0, // Defaults to height / 2
  initial_weight: 100,
  initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
});
```

This example will render an avatar with my initials "MC" as the image.

![Avatar Example](https://raw.githubusercontent.com/MatthewCallis/avatar/master/example.png)

### Options

Avatar is highly customizable and most options are self explanatory:

```js
{
  useGravatar: true,       // Allow Gravatars or not.
  fallbackImage: '',       // URL or Data URI used when no initials are provided and not using Gravatars.
  size: 80,                // Size in pixels, fallback for hidden images and Gravatar
  setSourceCallback: null, // Callback called when image source is set (useful to cache avatar sources provided by third parties such as Gravatar)

  // Initial Avatars Specific
  initials: '',          // Initials to be used.
  initial_fg: '#888888', // Text Color
  initial_bg: '#f4f6f7', // Background Color
  initial_size: 0,       // Text Size in pixels
  initial_weight: 100,   // Font weight (numeric value for light, bold, etc.)
  initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",

  // Gravatar Specific
  hash: '',                     // Precalculated MD5 string of an email address
  email: '',                    // Email used for the Gravatar
  fallback: 'mm',               // Fallback Type
  rating: 'x',                  // Gravatar Rating
  forcedefault: false,          // Force Gravatar Defaults
  allowGravatarFallback: false, // Use Gravatars fallback, not fallbackImage

  // GitHub Specific
  github_id: null,  // GitHub User ID.
}
```

## Installation

```shell
npm install --save avatar-initials
```

or copy the minified build from `browser/`

```html
<script src="browser/avatar.js"></script>
```

### jQuery Support

I haven't used jQuery in a long time and don't need it personally, so if you still use it the old helper is below.

```javascript
if (typeof jQuery !== 'undefined') {
  jQuery.fn.avatar = function avatar(options) {
    return this.each(() => {
      /* istanbul ignore else */
      if (!jQuery.data(this, 'plugin_avatar')) {
        jQuery.data(this, 'plugin_avatar', new Avatar(this, options));
      }
    });
  };
}
```

## Thanks

Pretty styles and design support kindly provided by [Andrew Crocker](https://twitter.com/andrewcrocker).
Originally built with love at [Apptentive](https://github.com/apptentive).
[Sun Knudsen](https://github.com/sunknudsen) for providing [a PR](https://github.com/MatthewCallis/avatar/pull/20) with `setSourceCallback`.

### License

Avatar is [MIT licensed](./LICENSE).
