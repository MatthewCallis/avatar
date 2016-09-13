/* eslint no-console: 0 */
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');

rollup({
  entry: 'src/avatar.js',
  plugins: [
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'], // Only 1 class.
    }),
  ],
})
.then(bundle => (
  bundle.write({
    format: 'es',
    moduleName: 'Avatar',
    dest: 'build/avatar.js',
  })
))
.then(() => {
  console.log('Bundle created');
})
.catch((e) => {
  console.log(e);
});
