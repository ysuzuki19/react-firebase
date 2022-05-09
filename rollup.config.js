import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

const entry = './index.tsx';

const babelHelpers = 'bundled';
const extensions = ['.tsx'];
const presets = ['@babel/preset-react'];

const es_config = {
  input: entry,
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  external: ['react', 'firebase'],
  plugins: [
    typescript(),
    babel({
      babelHelpers,
      extensions,
      presets,
    }),
  ],
};

const dts_config = {
  input: entry,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
};

const umd_config = {
  input: entry,
  output: {
    file: 'dist/index.umd.min.js',
    format: 'umd',
    name: 'ReactFirebase',
    exports: 'named',
    indent: false,
    globals: { react: 'react', firebase: 'firebase' },
  },
  external: ['react', 'firebase'],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers,
      extensions,
      presets,
    }),
    terser(),
  ],
};

export default [es_config, dts_config, umd_config];
