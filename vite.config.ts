/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'path';
// import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// import { playwright } from '@vitest/browser-playwright';
import dts from 'vite-plugin-dts';
// @ts-expect-error Needed as there is no declaration file for vite-plugin-eslint
import eslint from 'vite-plugin-eslint';
import libCss from 'vite-plugin-libcss';

// const dirname =
//   typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      '@moduk': path.resolve(__dirname, 'node_modules/@moduk'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Allow @import from node_modules
        additionalData: '',
      },
    },
  },
  plugins: [
    react(),
    libCss(),
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules'],
    }),
    dts({
      rollupTypes: true, // bundle all types into a single .d.ts file
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      // Entry file
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `react-library-starter-pack.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true, // so you can use `test`, `expect`, etc.
    environment: 'jsdom', // simulate browser environment
    setupFiles: './setupTests.ts', // setup file
    // TODO, observe if below generated code is needed
    // projects: [{
    //   extends: true,
    //   plugins: [
    //   // The plugin will run tests for the stories defined in your Storybook config
    //   // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //   storybookTest({
    //     configDir: path.join(dirname, '.storybook')
    //   })],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: playwright({}),
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.ts']
    //   }
    // }]
  },
});
