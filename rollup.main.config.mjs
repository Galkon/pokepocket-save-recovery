import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'main.js', // Your main process entry file
  output: {
    inlineDynamicImports: true,
    file: 'rollup/main.js', // Output bundle location
    format: 'cjs', // CommonJS, suitable for Node.js and Electron
    sourcemap: false // Optional: include source maps
  },
  // Externalize app dependencies. This makes the build faster
  // and prevents bundling of modules you want to load natively from Node.js
  external: [
    'electron'
    // You can include other external modules that you don't want to bundle
    // for example: 'electron-updater'
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    terser() // Use terser for minification. Exclude if you want non-minified output
  ]
};
