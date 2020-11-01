/** @format */

import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  output: [
    {
      file: './lib/rollup-wrapper.development.js',
      format: 'cjs',
    },
    {
      file: './lib/rollup-wrapper.min.js',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
}
