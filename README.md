# [Avatar](http://matthewcallis.github.io/avatar/)

[![Build Status](https://travis-ci.org/MatthewCallis/avatar.svg)](https://travis-ci.org/MatthewCallis/avatar)
[![Dependency Status](https://david-dm.org/MatthewCallis/avatar.svg)](https://david-dm.org/MatthewCallis/avatar)
[![devDependency Status](https://david-dm.org/MatthewCallis/avatar/dev-status.svg?style=flat)](https://david-dm.org/MatthewCallis/avatar#info=devDependencies)
[![Test Coverage](https://codeclimate.com/github/MatthewCallis/avatar/badges/coverage.svg)](https://codeclimate.com/github/MatthewCallis/avatar)
[![Coverage Status](https://coveralls.io/repos/MatthewCallis/avatar/badge.svg)](https://coveralls.io/r/MatthewCallis/avatar)

Avatar is a JavaScript library for showing Gravatars or generating user avatars.

## Examples

There are several examples [on the website](http://matthewcallis.github.io/avatar/).

```js
var avatar = new Avatar(document.getElementById('avatar'), {
  'useGravatar': false,
  'initials': 'MC'
});

/* or */

$('#avatar').avatar({
  'useGravatar': false,
  'initials': 'MC'
});
```

This example will render an avatar with my initials "MC" as the image.

![Avatar Example](https://raw.githubusercontent.com/MatthewCallis/avatar/master/example.png)

### Options

Avatar is highly customizable and most options are self explanatory:

```coffeescript
useGravatar: true # Allow Gravatars or not.
fallbackImage: '' # URL or Data URI used when no initials are provided and not using Gravatars.
size: 80          # Size in pixels, fallback for hidden images and Gravatar

# Initial Avatars Specific
initials: ''  # Initials to be used.
initial_fg: '#888888' # Text Color
initial_bg: '#f4f6f7' # Background Color
initial_size: null    # Text Size in pixels
initial_weight: 100
initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'"

# Gravatar Specific
hash: null  # Precalculated MD5 string of an email address
email: null # Email used for the Gravatar
fallback: 'mm'               # Fallback Type
rating: 'x'                  # Gravatar Rating
forcedefault: false          # Force Gravatar Defaults
allowGravatarFallback: false # Use Gravatars fallback, not fallbackImage

# GitHub Specific
github_id: null  # GitHub User ID.

# Avatars.io Specific
use_avatars_io: false # Enable Avatars.io Support
avatars_io:
  user_id: null       # Avatars.io User ID
  identifier: null    # Avatars.io Avatar Identifier
  twitter: null       # Twitter ID or Username
  facebook: null      # Facebook ID or Username
  instagram: null     # Instagram ID or Username
  size: 'medium'      # Size: small, medium, large
```

## Installation

```html
<script src="md5.js"></script>
<script src="avatar.js"></script>
```

Avatar expects a `window.md5()` function to be defined in order to generate the hashes needed for Gravatar. One is provided as a seperate file if you would like to use your own or don't plan on using Gravatar.

## Running Tests

To execute all unit tests, open `test/index.html` in your target browser.

## Browser Support

These are the browsers I have tested on personally:

### v1.2.0

* OS X 10.10.2 - Chrome 41.0.2243.2 dev (64-bit)
* OS X 10.10.2 - Firefox 34.0
* OS X 10.10.2 - Safari 8.0.3 (10600.3.10.2)
* iOS 8.1.2 - Safari 8
* iOS 8.1.2 - Chrome 39
* Microsoft Remote Desktop - Internet Explorer 11 (11.0.9879.0)

### v1.3.0

* OS X 10.10.2 - Chrome 48.0.2541.0 dev (64-bit)
* OS X 10.10.2 - Firefox 41.0.2
* OS X 10.10.2 - Safari 9.0 (11601.1.56)


## Thanks

Pretty styles and design support kindly provided by [Andrew Crocker](https://github.com/andrewcrocker).
Built with love at [Apptentive](https://github.com/apptentive).

## Package Managers

There are a lot of these and keeping up with them is hard, so here's a list:

* [npm](https://www.npmjs.com/) - [avatar-initials](https://www.npmjs.com/package/avatar-initials) - `package.json`
* [bower](http://bower.io/) - `bower.json`
* [jQuery Plugins](http://plugins.jquery.com/) - `avatar.jquery.json`
* [Jam](http://jamjs.org/) - [avatar-initials](http://jamjs.org/packages/#/details/avatar-initials) - `package.json`
* [Duo](http://duojs.org/) - `component.json`

### License

Avatar is [MIT licensed](./LICENSE).
