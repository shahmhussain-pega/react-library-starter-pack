# React Library Starter Pack

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to build and use the component library locally in another react application
1) npm run build
2) npm link

Then in the other app
3) npm link react-library-starter-pack
4) Then import the component

```js
import { Button } from 'react-library-starter-pack'
```

## How to publish the library
1) Add .npmrc file into your project with the following config
@shahmhussain-pega:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<ADD-YOUR-TOKEN>

2) Upgrade the version property in the package.json
e.g. "version": "0.0.1" to "version": "0.0.2" 

3) Run npm publish
```
  npm publish
```

## How to consume the library in another app

1) Add a .npmrc file into the root of the project with the following config
@shahmhussain-pega:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<ADD-YOUR-TOKEN>

2) Run npm install on the package e.g.
```
npm i @shahmhussain-pega/react-library-starter-pack
```

3) Consume the required component along with the global CSS
```js
// Component
import { Accordion } from "@shahmhussain-pega/react-library-starter-pack";
// CSS 
import "@shahmhussain-pega/react-library-starter-pack/dist/index.css";
```


## Component Library setup configurations
I configured the following into the package.json and vite-config.ts

package.json
```js
  "type": "module",
  "main": "dist/react-library-starter-pack.umd.js",
  "module": "dist/react-library-starter-pack.es.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],  
```

vite-config.ts
```js
  build: {
    lib: {
      entry: './src/index.ts', // Entry file
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `react-library-starter-pack.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }

```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
