import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    json(),
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    ts({
      tsconfig: 'tsconfig.json',
    }),
    terser(),
  ],
  external: ['axios'],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].cjs.js',
      format: 'cjs',
    },
    {
      dir: 'dist',
      entryFileNames: '[name].esm.js',
      format: 'esm',
    },
  ],
};
