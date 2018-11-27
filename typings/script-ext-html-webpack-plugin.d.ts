declare module 'script-ext-html-webpack-plugin' {
  import webpack from 'webpack';

  export interface ScriptExtHtmlWebpackPluginConfig {
    defaultAttribute?: string;
  }

  export default class ScriptExtHtmlWebpackPlugin extends webpack.Plugin {
    constructor(options: ScriptExtHtmlWebpackPluginConfig);
  }
}
