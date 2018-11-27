declare module 'workbox-webpack-plugin' {
  import webpack from 'webpack';

  export interface InjectManifestConfig {
    swSrc: string;
    swDest: string;
    exclude?: RegExp[];
  }

  export class InjectManifest extends webpack.Plugin {
    constructor(config: InjectManifestConfig);
  }
}
