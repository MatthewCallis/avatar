/* eslint no-console: 0 */
const { rollup } = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');

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
  console.log('Avatar created');
}).catch((e) => {
  console.error(e);
});

rollup({
  input: 'esm/AvatarComponent.js',
  plugins: [
    commonjs(),
    babel(),
    terser(),
  ],
}).then((bundle) => (
  bundle.write({
    format: 'iife',
    name: 'AvatarComponent',
    file: 'browser/AvatarComponent.js',
  })
)).then(() => {
  console.log('AvatarComponent created');
}).catch((e) => {
  console.error(e);
});
