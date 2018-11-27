declare module 'terser-webpack-plugin' {
  import webpack from 'webpack';

  export interface TerserPluginConfiguration {
    cache: boolean;
    parallel: boolean;
    extractComments: boolean;
  }

  export default class TerserPlugin extends webpack.Plugin {
    constructor(config: TerserPluginConfiguration);
  }
}
