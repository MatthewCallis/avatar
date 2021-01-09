/* eslint no-console: 0 */
const { rollup } = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

rollup({
  input: 'src/avatar.js',
  plugins: [
    commonjs(),
    babel(),
    terser(),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'iife',
    name: 'Avatar',
    file: 'browser/avatar.js',
  })
)).then(() => {
  console.log('Bundle created');
}).catch((e) => {
  console.error(e);
});
