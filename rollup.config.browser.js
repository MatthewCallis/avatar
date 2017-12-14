/* eslint no-console: 0 */
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');

rollup({
  input: 'src/avatar.browser.js',
  plugins: [
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'], // Only 1 class.
    }),
  ],
}).then(bundle => (
  bundle.write({
    format: 'es',
    name: 'Avatar',
    file: 'build/avatar.browser.js',
  })
)).then(() => {
  console.log('Browser bundle created');
}).catch((e) => {
  console.log(e);
});
