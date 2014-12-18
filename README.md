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

## Thanks

Pretty styles and design support kindly provided by @andrewcrocker.
Built with love at @Apptentive.

### License

Avatar is [MIT licensed](./LICENSE).
