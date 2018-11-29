<h1 align="center">PWA Starter Kit with Webpack</h1>
<p align="center">
  <a href="https://travis-ci.org/Dabolus/pwa-webpack-starter-kit"><img src="https://travis-ci.org/Dabolus/pwa-webpack-starter-kit.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/Dabolus/pwa-webpack-starter-kit"><img src="https://david-dm.org/Dabolus/pwa-webpack-starter-kit/status.svg" alt="Dependencies Status"></a>
  <a href="https://david-dm.org/Dabolus/pwa-webpack-starter-kit?type=dev"><img src="https://david-dm.org/Dabolus/pwa-webpack-starter-kit/dev-status.svg" alt="Dev Dependencies Status"></a>
  <a href="https://codeclimate.com/github/Dabolus/pwa-webpack-starter-kit/maintainability"><img src="https://api.codeclimate.com/v1/badges/33ee72825bfdd80bcd17/maintainability" alt="Maintainability"></a>
</p>

### Differences with the original [PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit/)
- [Gulp](https://gulpjs.com/) + [Polymer CLI](https://github.com/Polymer/tools/tree/master/packages/cli) → [Gulp](https://gulpjs.com/) + [Webpack](https://webpack.js.org/)
- Modern JavaScript → [TypeScript](https://www.typescriptlang.org/)
- CSS → [SCSS](https://sass-lang.com/)
- HTML → [EJS](https://ejs.co/) (only on raw HTML files, templates are still HTML)
- All-in-a-file components → Components split into component class, template and styles
- Automatic SW with [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) → Custom SW with [Workbox](https://github.com/GoogleChrome/workbox) auto injected
- Build targets: ES5, ES6, ESM → ES5, ES6 and possibly others _(but currently **no** ESM, as Webpack has its own way to handle dynamic imports)_

### Setup
- Install [Node.js](https://nodejs.org)
- Install [yarn](https://yarnpkg.com)
- Clone this repository
  ```bash
  git clone https://github.com/Dabolus/pwa-webpack-starter-kit.git <your-app-name> && cd <your-app-name>
  ```
- Install the project dependencies
  ```bash
  yarn install
  ```

## Adding more build targets
To configure Babel and PostCSS you have to specify **a list of browsers** that your app 
will support by being transpiled and polyfilled (via the 
[browserslist library](https://github.com/browserslist/browserslist)), while PRPL 
Server works by passing it **a set of browser capabilities** (via the 
[browser-capabilities library](https://github.com/Polymer/tools/tree/master/packages/browser-capabilities)). 
This means that to add new build targets you will have to check out what browsers 
support your target capabilities. To do so, you might find useful 
[this compatibility table](https://kangax.github.io/compat-table/es2016plus).

After finding out the correct browserslist configuration, adding a new build target is 
quite simple; you just need to tweak your Gulp configuration a bit. Here are the steps you should follow:
1. Open the main gulp config file (`gulp/config.ts`)
2. Copy-paste one of the `build:xx` tasks and replace its parameters respectively with 
   your new build name, the `browserslist` the new build will be built for and their 
   capabilities
3. Add your new `build:xx` task to the main `build` task, together with the other 
   builds that are run in parallel
4. Done!

### Contributing
**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

Be sure to check out the [contributing guidelines](CONTRIBUTING.md) to fasten
up the merging process.
