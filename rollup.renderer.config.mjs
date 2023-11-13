import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/renderer/renderer.js', // Entry point for your React renderer
  output: {
    file: 'rollup/renderer.js', // Output file
    format: 'iife', // Immediately Invoked Function Expression format for browser environments
    sourcemap: false // Optional source maps
  },
  external: [],
  plugins: [
    resolve({
      browser: true, // Resolve browser-specific modules
      extensions: ['.js', '.jsx'], // Add '.jsx' here
    }),
    babel({
      extensions: ['.js', '.jsx'], // Add JSX to the list of file extensions to process
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    copy({
      targets: [
        { src: 'src/renderer/index.html', dest: 'rollup' },
        { src: 'public/fonts/*', dest: 'rollup/fonts' }
      ],
      // Set to 'true' if you want to copy over files every time you build
      copyOnce: true,
      // This option allows the plugin to create directories for the files it copies
      flatten: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser() // Minify the bundle (optional)
  ]
};
