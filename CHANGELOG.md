## 6.0.0 (January 24th, 2023)

* Added a React component, this does not currently support non-Gravatar fallbacks when using Gravatar.
* Added `primarySource` setting to provide a default to be used unless missing.
* Added offset support to Initials.
* Added custom sizing to Initials.
* Updated types with descriptions from JSDoc.
* Move from nyc to c8 for coverage.
* BREAKING CHANGE: Updated the following setting keys:
  `initial_fg            => color`
  `initial_bg            => background`
  `initial_size          => fontSize`
  `initial_weight        => fontWeight`
  `initial_font_family   => fontFamily`
  `allowGravatarFallback => useGravatarFallback`
  `github_id             => github_id`

## 5.0.1 (January 19th, 2023)

* 9 years old 🎂!
* Simplify GitHub Avatar URL
* Convert fallback data URI to raw SVG to save ~400 bytes
* Update dependencies
* Fix types for <https://github.com/MatthewCallis/avatar/issues/44>

## 5.0.0 (January 8th, 2021)

* 7 years old 🎂!
* Update dependencies (none, just for dev).
* Support for ESM via `import`, CJS via `require`, and IIFE for browsers.
* Make `initialAvatar` a static method
* Clean up issues from age

## 4.1.0 (May 21st, 2018)

* Add support for `setSourceCallback`, called when image source is set. Useful to cache avatar sources provided by third parties such as Gravatar. [PR 20](https://github.com/MatthewCallis/avatar/pull/20)

## 4.0.0 (May 13th, 2018)

* Update dependencies.
* Use Babel 7 with `@babel/preset-env` targeting `"last 2 versions", "ie 11"`
* Use Object Spread instead of `Object.assign`
* Remove Leakages tests
* Add `module` and `jsnext:main` to the `package.json`
* Remove Code Climate

## 3.0.2 (April 2nd, 2018)

* Update dependencies.
* Rebuild browser build (not in npm).

## 3.0.1 (December 14th, 2017)

* Update dependencies.
* Rebuild browser build (not in npm).

## 3.0.0 (April 24th, 2017)

* Remove jQuery Support.
* Node build.
* Browser build (not in npm).
* Move from Istanbul/Mocha/PhantomJS to ava/nyc.
* Use md5 package.

## 2.2.0 (September 16th, 2016)

* [Fix Chrome 'Zoom' feature makes the generated initials too small](https://github.com/MatthewCallis/avatar/issues/11)

## 2.0.0 (September 13th, 2016)

* Update to ES6 from CoffeeScript.
* More test coverage.
* Code Coverage 100%
* Static methods if you only need URL generation.

## 1.4.0 (Feb. 16, 2015)

* Fix NPM bundling.

## 1.3.0 (October 22, 2015)

* Update to fix hidden images without a size.

## 1.2.0 (March 12, 2015)

* Added many more tests.
  * Added Travis CI Integration
  * Added Code Coverage
* Added GitHub Support
* Added Avatars.io Support

## 1.0.1 (March 3, 2015)

* Add main files to `main` property of `bower.json`.

## 1.0 (December 18, 2014)

* First release.
