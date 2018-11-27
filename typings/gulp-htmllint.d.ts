declare module 'gulp-htmllint' {
  export interface GulpHtmllintOptions {
    rules?: any;
    config?: string;
    plugins?: string[];
    failOnError?: boolean;
  }

  export interface GulpHtmllintReporter {
    filepath: string;
    issues: string[];
  }

  export default function GulpHtmllint(
    options?: GulpHtmllintOptions,
    customReporter?: GulpHtmllintReporter,
  ): any;
}
