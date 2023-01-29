[![view on npm](https://img.shields.io/npm/v/avatar-initials.svg)](https://www.npmjs.org/package/avatar-initials)
[![npm module downloads](https://img.shields.io/npm/dt/avatar-initials.svg)](https://www.npmjs.org/package/avatar-initials)
[![Build Status](https://travis-ci.com/MatthewCallis/avatar.svg?branch=master)](https://travis-ci.com/MatthewCallis/avatar)
[![Coverage Status](https://coveralls.io/repos/github/MatthewCallis/avatar/badge.svg?branch=master)](https://coveralls.io/github/MatthewCallis/avatar?branch=master)
[![Tree-Shaking Support](https://badgen.net/bundlephobia/tree-shaking/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Dependency Count](https://badgen.net/bundlephobia/dependency-count/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Minified + GZip](https://badgen.net/bundlephobia/minzip/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)
[![Minified](https://badgen.net/bundlephobia/min/avatar-initials)](https://bundlephobia.com/result?p=avatar-initials)

# [Avatar](http://matthewcallis.github.io/avatar/)

Avatar is a JavaScript library & React component for showing [Gravatars](https://en.gravatar.com/) or generating user avatars.

## Examples

There are several examples [on the website](http://matthewcallis.github.io/avatar/).

```js
import Avatar from 'avatar-initials';
// or
const Avatar = require('avatar-initials');

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

A simple React example:

```jsx
import { AvatarComponent } from 'avatar-initials';

export default function Example() {
  // ...
  return (
    <div className={`w-full flex self-center items-center justify-between relative ${classes}`}>
      <button type="button" onClick={() => setShowMenu(true)} title="Open Menu">
        <AvatarComponent
          classes="rounded-full"
          useGravatar={false}
          size={44}
          primarySource={currentUser.Avatar}
          color="#000000"
          background="#f1f1f1"
          fontSize={16}
          fontWeight={400}
          offsetY={24}
          initials={`${currentUser.FirstName[0]}${currentUser.LastName[0]}`}
        />
      </button>
    </div>
  );
}
```

### Options

Avatar is highly customizable and most options are self explanatory:

```js
{
  primarySource: '',           // A source image to be used by default before attempting any other sources.
  fallbackImage: '',           // URL or Data URI used when no initials are provided and not using Gravatars.
  size: 80,                    // Size in pixels, fallback for hidden images and Gravatar
  setSourceCallback: () => {}, // Callback called when image source is set (useful to cache avatar sources provided by third parties such as Gravatar)

  // Initial Avatars Specific
  initials: '',          // Initials to be used
  color: '#888888',      // Text Color
  background: '#f4f6f7', // Background Color
  fontSize: 0,           // Text Size in pixels
  fontWeight: 100,       // Font weight (numeric value for light, bold, etc.)
  fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
  offsetX: undefined,    // Text X position in pixels, defaults to: width / 2
  offsetY: undefined,    // Text Y position in pixels, defaults to: height / 2
  width: undefined,      // The width of the output image, size is used it not provided
  height: undefined,     // The height of the output image, size is used if not provided

  // Gravatar Specific
  useGravatar: true,            // Allow Gravatars as source
  useGravatarFallback: false,   // Use Gravatars fallback, not fallbackImage
  hash: '',                     // Precalculated MD5 string of an email address
  email: '',                    // Email used for the Gravatar
  fallback: 'mm',               // Fallback Type
  rating: 'x',                  // Gravatar Rating
  forcedefault: false,          // Force Gravatar Defaults

  // GitHub Specific
  githubId: null,  // GitHub User ID.
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

The browser build is built with the following `@babel/preset-env` targets:

```json
{
  "android": "109",
  "chrome": "109",
  "edge": "109",
  "firefox": "109",
  "ios": "16.2",
  "opera": "92",
  "safari": "16.2",
  "samsung": "19"
}
```

### jQuery Wrapper for Avatar

```javascript
if (typeof jQuery !== 'undefined') {
  jQuery.fn.avatar = function avatar(options) {
    return this.each(() => {
      if (!jQuery.data(this, 'plugin_avatar')) {
        jQuery.data(this, 'plugin_avatar', new Avatar(this, options));
      }
    });
  };
}
```

## Migrating to v6

The settings have changed keys and some new logic was introduced, the logic should not interefere but the keys will need to be updated:

```md
  initial_fg            => color
  initial_bg            => background
  initial_size          => fontSize
  initial_weight        => fontWeight
  initial_font_family   => fontFamily
  allowGravatarFallback => useGravatarFallback
  github_id             => github_id
```

## Thanks

Pretty styles and design support kindly provided by [Andrew Crocker](https://twitter.com/andrewcrocker).
[Sun Knudsen](https://github.com/sunknudsen) for providing [a PR](https://github.com/MatthewCallis/avatar/pull/20) with `setSourceCallback`.

### License

Avatar is [MIT licensed](./LICENSE).
