<p align="center">
  <img src="https://dabolus.github.io/polymer3-webpack-starter-kit/p+w.svg">
</p>
<h1 align="center">PWA Starter Kit with Webpack</h1>
<p align="center">
  <a href="https://travis-ci.org/Dabolus/pwa-webpack-starter-kit"><img src="https://travis-ci.org/Dabolus/pwa-webpack-starter-kit.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/Dabolus/pwa-webpack-starter-kit"><img src="https://david-dm.org/Dabolus/pwa-webpack-starter-kit/status.svg" alt="Dependencies Status"></a>
  <a href="https://david-dm.org/Dabolus/pwa-webpack-starter-kit?type=dev"><img src="https://david-dm.org/Dabolus/pwa-webpack-starter-kit/dev-status.svg" alt="Dev Dependencies Status"></a>
  <a href="https://codeclimate.com/github/Dabolus/pwa-webpack-starter-kit/maintainability"><img src="https://api.codeclimate.com/v1/badges/33ee72825bfdd80bcd17/maintainability" alt="Maintainability"></a>
</p>

### Differences with the original [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit/)
- [Polymer CLI](https://github.com/Polymer/tools/tree/master/packages/cli) → [Webpack](https://webpack.js.org/)
- ES8 → [TypeScript](https://www.typescriptlang.org/)
- CSS → [SCSS](https://sass-lang.com/)
- All-in-a-file components → Components logic and template separated from its styles
- Automatic SW with [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) → Custom SW with [Workbox](https://github.com/GoogleChrome/workbox) auto injected
- Build targets: ES5, ES6, ESM → **Currently only builds to ES6**

### Setup
- Install [Node.js](https://nodejs.org). Because of the syntax used in the configuration files,
  at least `v8.3` is required. If you want to feel safe, the latest LTS will work well.
- Install [yarn](https://yarnpkg.com)
- Clone this repository
  ```bash
  git clone https://github.com/Dabolus/pwa-webpack-starter-kit.git <your-app-name> && cd <your-app-name>
  ```
- Install the project dependencies
  ```bash
  yarn install
  ```

### But what about ES5?
Support for ES5 builds was dropped intentionally because basically all the browsers nowadays support ES6.
Building directly for ES6 will make the bundle much more lighter, so consider keeping everything in this way.
If you **really** need to target ES5
in your builds, then adding support for it is quite simple. Just add [Babel](https://babeljs.io/) in your
Webpack configuration using [babel-loader](https://github.com/babel/babel-loader) and then reference
`custom-elements-es5-adapter.js` (already included in the `webcomponentsjs` package) in your `index.html` **before your app bundle**.

### Contributing
**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

Be sure to check out the [contributing guidelines](CONTRIBUTING.md) to fasten
up the merging process.
