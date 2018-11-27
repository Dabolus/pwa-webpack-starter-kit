declare module 'gulp-stylelint' {
  export type GulpStylelintFormatter = 'string' | 'verbose' | 'json';

  export interface GulpStylelintReporter {
    formatter: GulpStylelintFormatter;
    save?: string;
    console?: boolean;
  }

  export interface GulpStylelintOptions {
    failAfterError?: boolean;
    reportOutputDir?: string;
    reporters?: GulpStylelintReporter[];
    debug?: boolean;
    fix?: boolean;
  }

  export default function GulpStylelint(options?: GulpStylelintOptions): any;
}
