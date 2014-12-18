# [Avatar](http://matthewcallis.github.io/avatar/)

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

Avatar is highly customizable and most options are self explanitor:

```coffeescript
useGravatar: true # Allow Gravatars or not.
fallbackImage: '' # URL or Data URI used when no initials are provided and not using Gravatars.

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
size: 80    # Size in pixels
fallback: 'mm'               # Fallback Type
rating: 'x'                  # Gravatar Rating
forcedefault: false          # Force Gravatar Defaults
allowGravatarFallback: false # Use Gravatars fallback, not fallbackImage
```

## Installation

```html
<script src="md5.js"></script>
<script src="avatar.js"></script>
```

Avatar expects a `window.md5()` function to be defined in order to generate the hashes needed for Gravatar. One is provided as a sperate file if you would like to use your own or don't plan on using Gravatar.

## Running Tests

To execute all unit tests, open `test/index.html` in your target browser.

## Browser Support

These are the browsers I have tested on personally:

* OS X 10.10.2 - Chrome 41.0.2243.2 dev (64-bit)
* OS X 10.10.2 - Firefox 34.0
* OS X 10.10.2 - Safari 8.0.3 (10600.3.10.2)
* iOS 8.1.2 - Safari 8
* iOS 8.1.2 - Chrome 39
* Microsoft Remote Desktop - Internet Explorer 11 (11.0.9879.0)

## Thanks

Pretty styles and design support kindly provided by [Andrew Crocker](https://github.com/andrewcrocker).
Built with love at [Apptentive](https://github.com/apptentive).

### License

Avatar is [MIT licensed](./LICENSE).
